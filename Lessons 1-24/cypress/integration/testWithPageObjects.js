import { onDatepickerPage } from '../support/page_objets/datepickerPage'
import { onFormLayoutsPage } from '../support/page_objets/formLayoutsPage'
import { onSmartTablePage } from '../support/page_objets/smartTablePage'
import {navigateTo} from '../support/page_objets/navigationPage'

describe('Test with Page Objects', () => {
    beforeEach(() => {
        cy.openHomePage()
    })

    it('Verify navigations actoss the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.toastPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.smartTablePage()

    })

    it(' should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Dima', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', '123456')
        navigateTo.datepickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatepickerWithRangeFromToday(5,10)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithfirstAndLastName('Dima', 'Mihnevich')
        onSmartTablePage.updateAgeByFirstName('Dima', '30')
        onSmartTablePage.deleteRowByIndex(1)
    })
})