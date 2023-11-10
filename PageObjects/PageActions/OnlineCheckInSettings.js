import { bookingPageElements } from './AddBooking'
import { landingPagesElements } from './LandingPages'
import { loginPageElements } from './LoginPageActions'
import { precheckinPageElements } from './PreCheckIn'

const onlineCheckInLocators = require('../PageElements/OnlineCheckInSettings.json')

const Login_Elements = new loginPageElements
const Booking_Elements = new bookingPageElements
const PreCheckIn_Elements = new precheckinPageElements
const LandingPages_Elements = new landingPagesElements

export class onlineCheckInElements {
  goToBasicInfoSettings(){
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.setting_tab).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.online_checkin).click({force: true})
    cy.scrollTo('top')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.binfo_modal).should('be.visible').click().wait(2000)
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.binfo_modal).should('be.visible').click()
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.binfo_modal_title)
      .should('contain', 'Collect Basic Information From Guest(s)')
  }
  disableBasicInfoToggle(){
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.setting_tab).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.online_checkin).click({force: true})
    cy.scrollTo('top').wait(2000)
    cy.get(':nth-child(2) > .toggle-card-content > .row > .col-12 > .checkbox-toggle > .checkbox-label').click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
        expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  uncheckAllCollectBasicDetailCheckboxes() {
    this.goToBasicInfoSettings()
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.full_name).should('contain', 'Full Name')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.fname_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.fname_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.phone_number).should('contain', 'Phone Number')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.pNumber_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.pNumber_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.dob).should('contain', 'Date of Birth')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.dob_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.dob_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.nationality).should('contain', 'Nationality')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.nationality_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.nationality_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.email_address).should('contain', 'Email Address')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.email_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.email_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.gender).should('contain', 'Gender')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.gender_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.gender_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.address).should('contain', 'Address')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.address_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.address_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.zip_code).should('contain', 'Zip Code')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.zipcode_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.zipcode_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_and_child).should('contain', 'Adults & Children')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_checkbox).uncheck()
      }
    });
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.save_button).click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
        expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  checkAllCollectBasicDetailCheckboxes(){
    this.goToBasicInfoSettings()
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.full_name).should('contain', 'Full Name')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.fname_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.fname_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.phone_number).should('contain', 'Phone Number')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.pNumber_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.pNumber_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.dob).should('contain', 'Date of Birth')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.dob_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.dob_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.nationality).should('contain', 'Nationality')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.nationality_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.nationality_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.email_address).should('contain', 'Email Address')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.email_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.email_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.gender).should('contain', 'Gender')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.gender_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.gender_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.address).should('contain', 'Address')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.address_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.address_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.zip_code).should('contain', 'Zip Code')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.zipcode_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.zipcode_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_and_child).should('contain', 'Adults & Children')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_checkbox).check()
      }
    })
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.save_button).click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
        expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  selectLimitedBookingSource(){
    this.goToBasicInfoSettings()
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.full_name).should('contain', 'Full Name')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.fname_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.fname_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.phone_number).should('contain', 'Phone Number')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.pNumber_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.pNumber_checkbox).check()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.email_address).should('contain', 'Email Address')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.email_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.email_checkbox).check()
      }
    })
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_and_child).should('contain', 'Adults & Children')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_checkbox).then(checkbox => {
      if (!checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_checkbox).check()
      }
    })
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.dob).should('contain', 'Date of Birth')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.dob_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.dob_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.nationality).should('contain', 'Nationality')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.nationality_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.nationality_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.gender).should('contain', 'Gender')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.gender_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.gender_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.address).should('contain', 'Address')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.address_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.address_checkbox).uncheck()
      }
    });
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.zip_code).should('contain', 'Zip Code')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.zipcode_checkbox).then(checkbox => {
      if (checkbox.is(':checked')) {
        cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.zipcode_checkbox).uncheck()
      }
    });
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.save_button).click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  adultChildrenBabiesWithPrimaryGuest(){
    this.goToBasicInfoSettings()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_babies).should('contain', 'All Guests (Adult, Children and Babies)')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_babies_radio_button).click({force: true})
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.with_primary_guest_completion).should('contain', 'When primary guest completes it')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.save_button).click()
    cy.get("button[class='swal2-confirm swal2-styled']").if().contains('button', 'New Bookings Only').click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  selectOnlyPrimaryGuest(){
    this.goToBasicInfoSettings()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.only_primay_guest).should('contain', 'Only Primary Guest')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.only_primary_guest_radio_button).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.save_button).click()
    cy.get("button[class='swal2-confirm swal2-styled']").if().contains('button', 'New Bookings Only').click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  mailValidation(){
    cy.get("a[class='nav-item nav-link']").contains('Bookings').click()
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.xpath("(//a[@class='dropdown-item notranslate'])[2]")
    .invoke("removeAttr", "target", {force: true})
    .click({force: true})
    cy.wait(3000)
    cy.get("a[id='tab_general-sent-email-detail'] span[class='mt-sm-15']").click({force: true})
    cy.xpath("(//td[contains(text(), 'Pre Check-in Completed')])[1]")
    .then($text => {
      const guestTitle = $text.text(); 
      cy.log(guestTitle)
      cy.wrap(guestTitle).should('contain', 'Pre Check-in Completed')
      cy.xpath("(//td[contains(text(), 'Guest')])[1]").should('contain', 'Guest')
      cy.xpath("(//td[contains(text(), 'Pre Check-in Completed')])[2]")
      .then($text => {
        const hostTitle = $text.text(); 
        cy.log(hostTitle)
        cy.wrap(hostTitle).should('contain', 'Pre Check-in Completed')
        cy.xpath("(//td[contains(text(), 'Host')])[1]").should('contain', 'Host')
      })
    })
  }
  selectWhenAllGuestRequired(){
    this.goToBasicInfoSettings()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_babies).should('contain', 'All Guests (Adult, Children and Babies)')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.adult_child_babies_radio_button).click({force: true})
    cy.get("label[for='whenConsideredCompleted1'] span").should('contain', 'When all required guests complete it')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.with_all_guest_completion).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.save_button).click()
    cy.get("button[class='swal2-confirm swal2-styled']").if().contains('button', 'New Bookings Only').click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  addGuestDetail(){
    cy.get(':nth-child(3) > :nth-child(4) > .guest-actions > .guest-edit > div').click({force: true})
    cy.get('#exampleModalLabel > span').should('contain', 'Adult 2').wait(3000)
    cy.xpath('(//input[@id="6"])[1]').type('Test Guest')
    cy.get('.iti__selected-flag').click()
    cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}3047557094')
    cy.xpath('(//input[@id="7"])[1]').type('1997-04-04')
    cy.xpath('(//select[@id="8"])[1]').select("Pakistani")
    // Enter email
    function generateUserName() {
      let text = "";
      let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            
      for (let i = 0; i < 10; i++)
      text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
      return text;  
    }
    const generatedUserName = generateUserName()
    cy.xpath('(//input[@id="1"])[1]')
      .should('have.attr', 'placeholder', 'Email address')
      .type(generatedUserName + '@mailinator.com')
    cy.xpath('(//select[@id="9"])[1]').select('Female')
    cy.xpath('//input[@id="update-property-address"]')
      .type('Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan{enter}')
    cy.xpath('(//input[@id="11"])[1]').type('54000')
    cy.get('button[class="btn btn-success btn-sm"]').click({force: true}).wait(4000)
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data saved Successfully.')
    })
    cy.get(':nth-child(3) > :nth-child(1) > .guest-name').should('have.text', 'Test Guest')
    cy.get(':nth-child(3) > :nth-child(2) > .guest-email').should('contain', generatedUserName + '@mailinator.com')
    cy.get(':nth-child(3) > :nth-child(3) > .badge').should('contain', 'Completed')
    cy.wait(3000)
  }
  addChildDetail(){
    cy.get(':nth-child(4) > :nth-child(4) > .guest-actions > .guest-edit > div').click()
    cy.get("div[id='guestDetailsModal'] div[class='modal-header'] span:nth-child(1)").should('contain', 'Child 1').wait(3000)
    cy.xpath('(//input[@id="6"])[1]').type('Test Guest')
    cy.get('.iti__selected-flag').click()
    cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}3047557094')
    cy.xpath('(//input[@id="7"])[1]').type('1997-04-04')
    cy.xpath('(//select[@id="8"])[1]').select("Pakistani")
    // Enter email
    function generateUserName() {
      let text = "";
      let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            
      for (let i = 0; i < 10; i++)
      text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
      return text;  
    }
    const generatedUserName = generateUserName()
    cy.xpath('(//input[@id="1"])[1]')
      .should('have.attr', 'placeholder', 'Email address')
      .type(generatedUserName + '@mailinator.com')
    cy.xpath('(//select[@id="9"])[1]').select('Female')
    cy.xpath('//input[@id="update-property-address"]')
      .type('Lahore-Islamabad Motorway, Sabzazar Block E Sabzazar Housing Scheme Phase 1 & 2 Lahore, Pakistan{enter}')
    cy.xpath('(//input[@id="11"])[1]').type('54000')
    cy.get('button[class="btn btn-success btn-sm"]').click({force: true}).wait(4000)
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data saved Successfully.')
    })
    cy.reload(true)
    cy.xpath("(//h6[contains(text(),'Test Guest')])[4]").should('have.text', 'Test Guest')
    cy.get('tr:nth-child(4) td:nth-child(2) span:nth-child(1)').should('contain', generatedUserName + '@mailinator.com')
    cy.xpath("(//font[contains(text(),'Completed')])[5]").should('contain', 'Completed')
    cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        3/3')
    cy.wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
  }
  basicInfoOriginalSettigs(){
    this.goToBasicInfoSettings()
    cy.get("label[for='pGuest1'] span").should('contain', 'All Guests (Adult, Children and Babies)')
    cy.get('#pGuest1').click({force: true})
    cy.get("label[for='whenConsideredCompleted0'] span").should('contain', 'When primary guest completes it')
    cy.get('#whenConsideredCompleted0').click()
    cy.get("a[class='btn btn-success btn-sm px-3']").click()
    cy.get("button[class='swal2-confirm swal2-styled']").if().contains('button', 'New Bookings Only').click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  allGuestOver18WithPrimary(){
    this.goToBasicInfoSettings()
    cy.get("label[for='pGuest2'] span").should('contain', 'All Guests (Over 18)')
    cy.get('#pGuest2').click({force: true})
    cy.get("a[class='btn btn-success btn-sm px-3']").click()
    cy.get("button[class='swal2-confirm swal2-styled']").if().contains('button', 'New Bookings Only').click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  allGuestOver18WithAll(){
    this.goToBasicInfoSettings()
    cy.get("label[for='pGuest2'] span").should('contain', 'All Guests (Over 18)')
    cy.get('#pGuest2').click({force: true})
    cy.get("label[for='whenConsideredCompleted1'] span").should('contain', 'When all required guests complete it')
    cy.get('#whenConsideredCompleted1').click({force: true})
    cy.get("a[class='btn btn-success btn-sm px-3']").click()
    cy.get("button[class='swal2-confirm swal2-styled']").if().contains('button', 'New Bookings Only').click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data has been saved successfully.')
    })
  }
  disableArrivalByToggle(){
    this.checkAllCollectBasicDetailCheckboxes()
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.setting_tab).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.online_checkin).click({force: true})
    cy.scrollTo('top')
    cy.xpath("//h5[normalize-space()='Collect Arrival time & arrival method']").should('contain', 'Collect Arrival time & arrival method')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.arrival_by_action_icon).should('be.visible').click().wait(2000)
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.arrival_by_action_icon).should('be.visible').click()
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.arrival_by_modal).should('contain', 'Collect Arrival time & arrival method')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.booking_source_dropdown).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.booking_source_dropdown).type('{backspace}')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.save_button).click()
    cy.get("label[for='3']").should('not.be.enabled')
  }
  enableArrivalByToggle(allbookingSource){
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.setting_tab).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.online_checkin).click({force: true})
    cy.scrollTo('top')
    cy.xpath("//h5[normalize-space()='Collect Arrival time & arrival method']").should('contain', 'Collect Arrival time & arrival method')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.arrival_by_action_icon).should('be.visible').click().wait(2000)
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.arrival_by_action_icon).should('be.visible').click()
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.arrival_by_modal).should('contain', 'Collect Arrival time & arrival method')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.booking_source_dropdown).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.booking_source_dropdown).type('{backspace}')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.save_button).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.arrival_by_action_icon).should('be.visible').click().wait(2000)
    cy.xpath(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.arrival_by_modal).should('contain', 'Collect Arrival time & arrival method')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.booking_source_dropdown).click()
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.booking_source_dropdown).type(allbookingSource)
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.booking_source_dropdown).type('{enter}')
    cy.get(onlineCheckInLocators.OnlineCheckInSettingsPageLocators.save_button).click()
    cy.get('.toast-message').invoke('text')
    .then((resp) => {
      expect(resp).to.equal('Data has been saved successfully.')
    })
    cy.wait(5000)
    cy.get("label[for='3']").then(toggle => {
      if (!toggle.is(':enabled')) {
        cy.get("label[for='3']").click(); // Assuming clicking disables the toggle
        cy.get('.toast-message').invoke('text')
        .then((resp) => {
          expect(resp).to.equal('Data has been saved successfully.')
        })
      }
    });
  }

}

