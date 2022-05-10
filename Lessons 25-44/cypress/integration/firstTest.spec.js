/// <reference types="cypress"/>

describe('Test with backend', () => {
	beforeEach('login to the app',() => {
		cy.server();
		cy.route('GET', '**/tags', 'fixture:tags.json');
		cy.loginToApplication()
	})
	it('verify correct request and response ', () => {

		cy.server()
		cy.route('POST', '**/articles').as('postArticles')

		cy.contains('New Article').click()
		cy.get('[formcontrolname="title"]').type('This is title')
		cy.get('[formcontrolname="description"]').type('This is description')
		cy.get('[formcontrolname="body"]').type('This is a body of article')
		cy.contains('Publish Article').click()

		cy.wait('@postArticles')
		cy.get('@postArticles').then((xhr) => {
			expect(xhr.status).to.eq(200)
			expect(xhr.request.body.article.body).to.equal('This is a body of article')
			expect(xhr.response.body.article.description).to.equal('This is description')
		})
	})

	it('Should gave tags with routing object', () => {
		cy.get('.tag-list')
			.should('contain', 'cypress')
			.and('contain', 'automation')
			.and('contain', 'testing')
	})

	it('verify global feed likes count', () => {
		cy.route('GET', '**/articles/feed*', '{"articles": [],"articlesCount": 0}')
		cy.route('GET', '**/articles*', 'fixture:articles.json')

		cy.contains('Global Feed').click()
		cy.get('app-article-list button').then(listOfButton=>{
			expect(listOfButton[0]).to.contain('0')
			expect(listOfButton[1]).to.contain('9')
		})

		cy.fixture('articles').then(file => {
			const articlesLink = file.articles[0].slug

			cy.route('POST', '**/articles/'+articlesLink+'/favorite', file)

			cy.get('app-article-list button').eq(0).click().should('contain', 1)
		})

	})
})
