/// <reference types="cypress"/>

describe('First suite', ()=>{

	it('First test', ()=>{

		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		cy.get('input')

		cy.get('#inputEmail1')

		cy.get('.input-full-width')

		cy.get('[placeholder]')

		cy.get('[placeholder="Email"]')

		cy.get('[class="input-full-width size-medium shape-rectangle"]')

		cy.get('input[placeholder="Email"]')

		cy.get('[placeholder="Email"]#inputEmail1.input-full-width')

		cy.get('[data-cy="imputEmail1"]')

	})

	it('Second test', ()=>{
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		cy.get('[data-cy="signInButton"]')

		cy.contains('Sign in')

		cy.contains('[status="warning"]', 'Sign in')

		cy.get('#inputEmail3')
			.parents('form')
			.find('button')
			.should('contain', 'Sign in')
			.parents('form')
			.find('nb-checkbox')
			.click()

		cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

	})

	it('then and wrap methods', ()=>{
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		// cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
		// cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
		// cy.contains('nb-card', 'Basic form').find('[for= "exampleInputEmail1"]').should('contain', 'Email address')
		// cy.contains('nb-card', 'Basic form').find('[for= "exampleInputPassword1"]').should('contain', 'Password')

		//cypress style 
		cy.contains('nb-card', 'Using the Grid').then(firstForm =>{
			const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
			const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
			expect(emailLabelFirst).to.be.eql('Email')
			expect(passwordLabelFirst).to.be.eql('Password')
		})

		cy.contains('nb-card', 'Basic form').then(secondForm =>{
			const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
			const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
			expect(emailLabelSecond).to.be.eql('Email address')
			// expect(passwordLabelSecond).to.be.eql('Password')
			cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
		})		
	})
	
	it('invoke commands', ()=>{
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		//1
		cy.get('[for= "exampleInputEmail1"]').should('contain', 'Email address')

		//2
		cy.get('[for= "exampleInputEmail1"]').then( labelText=>{
			expect(labelText.text()).to.be.eql('Email address')
		})
		
		//3
		cy.get('[for= "exampleInputEmail1"]').invoke('text').then(text=>{
			expect(text).to.be.eql('Email address')
		})

		cy.contains('nb-card', 'Basic form')
			.find('nb-checkbox')
			.click()
			.find('.custom-checkbox')
			.invoke('attr', 'class')
			// .should('contain', 'checked')
			.then(classValue=>{
				expect(classValue).to.contain('checked')
			})
	})

	it.only('assert property', ()=>{
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Datepicker').click()

		cy.contains('nb-card', 'Common Datepicker').find('input').then(input=>{
			cy.wrap(input).click()
			cy.get('nb-calendar-day-picker').contains('17').click()
			cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 17, 2022')
		})
	})
})
