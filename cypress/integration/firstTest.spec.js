/// <reference types="cypress"/>

describe('First suite', () => {

	it('First test', () => {

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

	it('Second test', () => {
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

	it('then and wrap methods', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		// cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
		// cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
		// cy.contains('nb-card', 'Basic form').find('[for= "exampleInputEmail1"]').should('contain', 'Email address')
		// cy.contains('nb-card', 'Basic form').find('[for= "exampleInputPassword1"]').should('contain', 'Password')

		//cypress style 
		cy.contains('nb-card', 'Using the Grid').then(firstForm => {
			const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
			const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
			expect(emailLabelFirst).to.be.eql('Email')
			expect(passwordLabelFirst).to.be.eql('Password')
		})

		cy.contains('nb-card', 'Basic form').then(secondForm => {
			const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
			const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
			expect(emailLabelSecond).to.be.eql('Email address')
			// expect(passwordLabelSecond).to.be.eql('Password')
			cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
		})
	})

	it('invoke commands', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		//1
		cy.get('[for= "exampleInputEmail1"]').should('contain', 'Email address')

		//2
		cy.get('[for= "exampleInputEmail1"]').then(labelText => {
			expect(labelText.text()).to.be.eql('Email address')
		})

		//3
		cy.get('[for= "exampleInputEmail1"]').invoke('text').then(text => {
			expect(text).to.be.eql('Email address')
		})

		cy.contains('nb-card', 'Basic form')
			.find('nb-checkbox')
			.click()
			.find('.custom-checkbox')
			.invoke('attr', 'class')
			// .should('contain', 'checked')
			.then(classValue => {
				expect(classValue).to.contain('checked')
			})
	})

	it('assert property', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Datepicker').click()

		cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
			cy.wrap(input).click()
			cy.get('nb-calendar-day-picker').contains('17').click()
			cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 17, 2022')
		})
	})
	it('radio button', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
			cy.wrap(radioButtons)
				.first()
				.check({ force: true })
				.should('be.checked')

			cy.wrap(radioButtons)
				.eq(1)
				.check({ force: true })

			cy.wrap(radioButtons)
				.first()
				.should('not.be.checked')

			cy.wrap(radioButtons)
				.eq(2)
				.should('be.disabled')
		})
	})

	it('check boxes', () => {
		cy.visit('/')
		cy.contains('Modal & Overlays').click()
		cy.contains('Toastr').click()

		// cy.get('[type="checkbox"]').check({force:true})
		// cy.get('[type="checkbox"]').eq(0).click({force:true})
		// cy.get('[type="checkbox"]').eq(1).check({force:true})
	})

	it('list and dropdown', () => {
		cy.visit('/')

		//1 singl
		// cy.get('nav nb-select').click()
		// cy.get('.options-list').contains('Dark').click()
		// cy.get('nav nb-select').should('contain', 'Dark')
		// cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

		//2 multi
		cy.get('nav nb-select').then(dropdown => {
			cy.wrap(dropdown).click()
			cy.get('.options-list nb-option').each((listItem, index) => {
				const itemText = listItem.text().trim()

				const colors = {
					"Light": "rgb(255, 255, 255)",
					"Dark": "rgb(34, 43, 69)",
					"Cosmic": "rgb(50, 50, 89)",
					"Corporate": "rgb(255, 255, 255)"
				}

				cy.wrap(listItem).click()
				cy.wrap(dropdown).should('contain', itemText)
				cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
				if (index < 3) {
					cy.wrap(dropdown).click()
				}
			})
		})


	})

	it.only('web tables', () => {
		cy.visit('/')
		cy.contains('Tables & Data').click()
		cy.contains('Smart Table').click()

		//1
		cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
			cy.wrap(tableRow).find('.nb-edit').click()
			cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
			cy.wrap(tableRow).find('.nb-checkmark').click()
			cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
		})

		//2
		cy.get('thead').find('.nb-plus').click()
		cy.get('thead').find('tr').eq(2).then(tableRow => {
			cy.wrap(tableRow).find('[placeholder="First Name"]').type('Dima')
			cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Mihnevich')
			cy.wrap(tableRow).find('.nb-checkmark').click()

		})
		cy.get('tbody tr').first().find('td').then(tableColumns => {
			cy.wrap(tableColumns).eq(2).should('contain', 'Dima')
			cy.wrap(tableColumns).eq(3).should('contain', 'Mihnevich')
		})

		//3
		const age = [20, 30, 40, 200]

		cy.wrap(age).each(age => {
			cy.get('thead [placeholder="Age"]').clear().type(age)
			cy.wait(500)
			cy.get('tbody tr').each(tableRow => {
				if(age !=200){
					cy.wrap(tableRow).find('td').eq(6).should('contain', age)
				}else{
					cy.wrap(tableRow).should('contain', 'No data found')
				}
			})
		})


	})
})
