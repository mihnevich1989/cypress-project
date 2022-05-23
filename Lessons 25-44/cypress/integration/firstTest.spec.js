/// <reference types="cypress"/>

describe('Test with backend', () => {
	beforeEach('login to the app', () => {
		cy.intercept({ method: 'GET', path: 'tags' }, { fixture: 'tags.json' });
		cy.loginToApplication()
	})
	it('intercepting and modifying the request and response', () => {

		// cy.intercept('POST', '**/api.realworld.io/api/articles', (req)=>{
		// 	req.body.article.description = "This is description 2"
		// }).as('postArticles')
		cy.intercept('POST', '**/api.realworld.io/api/articles', (req) => {
			req.reply(res => {
				expect(res.body.article.description).to.equal('This is description')
				res.body.article.description = "This is description 2"
			})
		}).as('postArticles')

		cy.contains('New Article').click()
		cy.get('[formcontrolname="title"]').type('This is title')
		cy.get('[formcontrolname="description"]').type('This is description')
		cy.get('[formcontrolname="body"]').type('This is a body of article')
		cy.contains('Publish Article').click()

		cy.wait('@postArticles')
		cy.get('@postArticles').then((xhr) => {
			expect(xhr.response.statusCode).to.eq(200)
			expect(xhr.request.body.article.body).to.equal('This is a body of article')
			expect(xhr.response.body.article.description).to.equal('This is description 2')
		})

		// my commands for deleting the article, because i was have a fail in next run test 
		cy.get('.article-actions').contains('Delete Article1').click()
		cy.wait(500)
		cy.contains('Global Feed').click()
		cy.get('app-article-list').should('not.contain', 'This is title')
	})

	it('Should gave tags with routing object', () => {
		cy.get('.tag-list')
			.should('contain', 'cypress')
			.and('contain', 'automation')
			.and('contain', 'testing')
	})

	it('verify global feed likes count', () => {
		cy.intercept('GET', '**/articles/feed*', { "articles": [], "articlesCount": 0 })
		cy.intercept('GET', '**/articles**', { fixture: 'articles.json' })

		cy.contains('Global Feed').click()
		cy.get('app-article-list button').then(listOfButton => {
			expect(listOfButton[0]).to.contain('0')
			expect(listOfButton[1]).to.contain('9')
		})

		cy.fixture('articles').then(file => {
			const articlesLink = file.articles[0].slug

			cy.intercept('POST', '**/articles/' + articlesLink + '/favorite', file)

			cy.get('app-article-list button').eq(0).click().should('contain', 1)
		})

	})

	it('delete a new article a global test', () => {

		const bodyRequest = {
			"article": {
				"tagList": [],
				"title": "Request from API",
				"description": "Api testing is easy",
				"body": "Angular is cool"
			}
		}

		cy.get('@token').then(token => {

			cy.request({
				url: 'https://api.realworld.io/api/articles',
				headers: { 'Authorization': 'Token ' + token },
				method: 'POST',
				body: bodyRequest
			}).then(response => {
				expect(response.status).to.eql(200)
			})
			cy.contains('Global Feed').click()
			cy.get('.article-preview').first().click()
			cy.get('.article-actions').contains('Delete Article').click()
			cy.wait(500)

			cy.request({
				url: "https://api.realworld.io/api/articles?limit=10&offset=0",
				headers: { 'Authorization': 'Token ' + token },
				method: 'GET'
			}).its('body').then(body => {
				expect(body.articles[0].title).not.to.equal("Request from API")
			})
		})
	})
})