/// <reference types ="Cypress" />

import { bookingPageElements } from "../../../PageObjects/PageActions/AddBooking"
import { landingPagesElements } from "../../../PageObjects/PageActions/LandingPages"
import { loginPageElements } from "../../../PageObjects/PageActions/LoginPageActions"
import { onlineCheckInElements } from "../../../PageObjects/PageActions/OnlineCheckInSettings"
import { precheckinPageElements } from "../../../PageObjects/PageActions/PreCheckIn"

const Login_Elements = new loginPageElements  
const Booking_Elements = new bookingPageElements
const PreCheckIn_Elements = new precheckinPageElements
const LandingPages_Elements = new landingPagesElements
const OnlineCheckInSettings_Elements = new onlineCheckInElements 


describe('Test Online CheckIn Settings Functionalities', () => {
   
  beforeEach(() => {
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
  })

  it('CA_CBIFG_01 > Validate When user has Checked all the checkboxes of Collect Basic Detail', () => {
    OnlineCheckInSettings_Elements.checkAllCollectBasicDetailCheckboxes()
    PreCheckIn_Elements.validateNewAddedBooking("QA Test Property")  
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.xpath("(//a[@class='dropdown-item notranslate'])[1]")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      // User will logout from the portal and will open CheckIn link
      Login_Elements.profileIcon()
      cy.visit(link)
      cy.wait(4000)
      cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
      cy.wait(4000)
      // Validate Soruce type
      cy.get('.gp-property-dl > :nth-child(2) > .notranslate')
      .then(($sour) => {
        const sourceType = $sour.text().trim()
        cy.wrap(sourceType).should('eq',sourceType)
      })
      cy.wait(3000)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
      PreCheckIn_Elements.basicInfoVerification()
      cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')
    })
  })
  it('CA_CBIFG_02 > Validate when Collect Basic Information From Guest(s) toggle is disable', () => {
    OnlineCheckInSettings_Elements.disableBasicInfoToggle()
    PreCheckIn_Elements.validateNewAddedBooking("QA Test Property") 
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    // Validate Disable Basic info page
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.xpath("(//a[@class='dropdown-item notranslate'])[1]")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      // User will logout from the portal and will open CheckIn link
      Login_Elements.profileIcon()
      cy.visit(link)
      cy.wait(4000)
      cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
      cy.wait(4000)
      // Validate Soruce type
      cy.get('.gp-property-dl > :nth-child(2) > .notranslate')
      .then(($sour) => {
        const sourceType = $sour.text().trim()
        cy.wrap(sourceType).should('eq',sourceType)
      })
      cy.wait(3000)     
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')
      cy.visit('/')
      Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
      OnlineCheckInSettings_Elements.disableBasicInfoToggle()
    })
  }) 
  it("CA_CBIFG_03 > Validate If all items are disabled from collect basic details section then this section will also be disabled and will not show on pre-checkin", () => {
    OnlineCheckInSettings_Elements.uncheckAllCollectBasicDetailCheckboxes()
    PreCheckIn_Elements.validateNewAddedBooking("QA Test Property") 
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    // Validate Disable Basic info page
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.xpath("(//a[@class='dropdown-item notranslate'])[1]")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      // User will logout from the portal and will open CheckIn link
      Login_Elements.profileIcon()
      cy.visit(link)
      cy.wait(4000)
      cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
      cy.wait(4000)
      // Validate Soruce type
      cy.get('.gp-property-dl > :nth-child(2) > .notranslate')
      .then(($sour) => {
        const sourceType = $sour.text().trim()
        cy.wrap(sourceType).should('eq',sourceType)
      })
      cy.wait(3000)     
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')      
      cy.visit('/')
      Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
      OnlineCheckInSettings_Elements.checkAllCollectBasicDetailCheckboxes()
    })
  })
  it("CA_CBIFG_04 > Validate Collect Basic Information From will show only for selected booking source from the list", () => {
    OnlineCheckInSettings_Elements.selectLimitedBookingSource()
    PreCheckIn_Elements.validateNewAddedBooking("QA Test Property") 
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.xpath("(//a[@class='dropdown-item notranslate'])[1]")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link) 
      // Here we will copy the and Visite the Pre Check-In process after logout from the portal
      cy.xpath("(//a[@class='dropdown-item notranslate'])[3]")
      .invoke("removeAttr", "target", {force: true})
      .click({force: true})
      cy.wait(3000)
      // Here we will get the FullName and Save into Variable
      cy.xpath('(//input[@id="6"])[1]') 
      .invoke('val') 
      .then((text) => {
        const fName = text; 
        cy.wrap(fName).should('eq', fName) 
        // Here we will get the Email and Save into Variable
        cy.xpath('(//input[@id="1"])[1]')
        .invoke('val') 
        .then((text) => {
          const emailText = text; 
          cy.wrap(emailText).should('eq', emailText)
          // User will logout from the portal and will open CheckIn link
          Login_Elements.profileIcon()
          cy.visit(link)
          cy.wait(4000)
          cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
          cy.wait(4000)
          // Validate Soruce type
          cy.get('.gp-property-dl > :nth-child(2) > .notranslate')
          .then(($sour) => {
            const sourceType = $sour.text().trim()
            cy.wrap(sourceType).should('eq',sourceType)
          })
          cy.wait(3000)     
          cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
          cy.get('h4 > .translate').should('contain', 'CONTACT INFORMATION')
          cy.wait(3000)
          //Here we will validate Full Name and Email entered during Booking
          cy.xpath('(//input[@id="6"])[1]')
          .invoke('val') 
          .then((text) => {
            const fullName = text; 
            cy.wrap(fullName).should('eq', fName)
            cy.xpath('(//input[@id="1"])[1]')
            .invoke('val') 
            .then((text) => {
              const emailAddress = text; 
              cy.wrap(emailAddress).should('eq', emailText)
              cy.get("label[for='2'] span[class='translate']").should('contain', 'Phone Number')
              cy.get('.iti__selected-flag').click()
              cy.get('#iti-0__item-pk').contains('Pakistan (‫پاکستان‬‎)').type('{enter}3047557094')
              cy.wait(3000)
              cy.get("h4[data-test='basicguestTitle'] span[class='translate']").should('contain', 'GUESTS')
              cy.get("label[for='guestAdults'] span[class='translate']").should('contain', 'Adults')
              cy.get('#guestAdults').invoke('val') 
              .then((text) => {
                const adults = text; 
                cy.wrap(adults).should('eq', '2')
              })
              cy.get("label[for='guestChildren'] span[class='translate']").should('contain', 'Children (2-17 years)')
              cy.get('[data-test="basicChildrenInput"]').invoke('val') 
              .then((text) => {
                const child = text; 
                cy.wrap(child).should('eq', '1')  
              })
              cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
              cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION')              
              cy.visit('/')
              Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
              OnlineCheckInSettings_Elements.checkAllCollectBasicDetailCheckboxes()
            })
          })
        })
      })
    })
  })
  it("CA_CITG_01 > If Collect Arrival time & Arrival Method is OFF then it will not show on pre-checkin", () => {
    OnlineCheckInSettings_Elements.disableArrivalByToggle()
    OnlineCheckInSettings_Elements.enableGuestPassportID()
    PreCheckIn_Elements.validateNewAddedBooking("QA Test Property") 
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    //Change Settings same Again
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
  })
  it("CA_CITG_02 > If Booking's channel of Arrival source is not matching with selected booking source then this section will not show", () => {
    OnlineCheckInSettings_Elements.enableArrivalByToggle('Direct')
    PreCheckIn_Elements.validateNewAddedBooking("QA Test Property") 
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    //Change Settings same Again
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
  })
  it('CA_CITG_03 > Default "Estimate Arrival Time" should property "Standard Check-In" If available', () => {
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
    PreCheckIn_Elements.validateNewAddedBooking("Test Property") 
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
    cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time')
    cy.get("#standard_check_in_time").should('contain', '4:00')
  })
  it('CA_CPIG_01 > Validate If Collect Passport/ID of Guest section is OFF then it will not show on pre-checkin', () => {
    OnlineCheckInSettings_Elements.disableGuestPassportID()
    PreCheckIn_Elements.validateNewAddedBooking("Test Property")
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
    cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time').wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
    cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    //Change Settings same Again
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.enableGuestPassportID()
  })
  it('CA_CPIG_02 > Validate If Collect Passport/ID of Guest section Bookings channel is not matching with selected booking source then this section will not show', () => {
    OnlineCheckInSettings_Elements.enableGuestPassportID()
    OnlineCheckInSettings_Elements.changeIdBookingSource('Direct')
    PreCheckIn_Elements.validateNewAddedBooking("Test Property")
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
    cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time').wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
    cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    //Change Settings same Again
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.changeIdBookingSource('All Booking Source')
  })
  it('CA_CPIG_03 > If Select acceptable identification types is Drivers License or ID Card then front and back document will appear', () => {
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
    OnlineCheckInSettings_Elements.enableGuestPassportID()
    OnlineCheckInSettings_Elements.selectLicenseAndIDcard()
    PreCheckIn_Elements.validateNewAddedBooking("Test Property")
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
    cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time').wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
    cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    cy.get('[for="drivers_license"]').should('contain', "Driver's License")
    cy.get('[for="id_card"]').should('contain', 'ID Card')
    cy.get('.doc-wrap > :nth-child(2) > div > .btn').should('contain', "Upload Driver's License Front")
    cy.get(':nth-child(3) > div > .btn').should('contain', "Upload Driver's License Back")
    cy.get('#id_card').should('not.be.checked').click({force: true}).wait(2000)
    cy.xpath('//label[normalize-space()="Upload ID Card Front"]').should('contain', 'Upload ID Card Front')
    cy.xpath('//label[normalize-space()="Upload ID Card Back"]').should('contain', 'Upload ID Card Back')
  })
  it('CA_CPIG_04 > If Select acceptable identification types is passwort then it will show single file upload option', () => {
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
    OnlineCheckInSettings_Elements.enableGuestPassportID()
    OnlineCheckInSettings_Elements.selectPassport()
    PreCheckIn_Elements.validateNewAddedBooking("Test Property")
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
    cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time').wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
    cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    cy.get("label[for='passport_file'] span span[class='notranslate']").should('contain', 'Upload Passport')
    //Change Settings same Again
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.selectLicenseAndIDcard()
  })
  it('CA_CPIG_05 > If passport is select for upload and guest nationality belongs to excluded nationality then this section will not show or passport upload option will not show', () => {
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
    OnlineCheckInSettings_Elements.enableGuestPassportID()
    OnlineCheckInSettings_Elements.selectPakistani()
    PreCheckIn_Elements.validateNewAddedBooking("Test Property")
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
    cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time').wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
    cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    cy.wait(3000)
    const cardImage = 'Images/visaCard.png'
    cy.get("#credit_card_file")
      .attachFile(cardImage)
    cy.wait(5000) 
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.get('div[class="gp-box gp-box-of-inner-pages"] p:nth-child(1)').should('have.text', 'Take a selfie to authenticate your identity')
    //Change Settings same Again
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.removeNationality()
  })
  it('CA_CPIG_06 > Validate Document upload instructions should be visible on the pre-checkin', () => {
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
    OnlineCheckInSettings_Elements.enableGuestPassportID()
    OnlineCheckInSettings_Elements.docInstructions()
    PreCheckIn_Elements.validateNewAddedBooking("Test Property")
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
    cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time').wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
    cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    cy.wait(3000)
    cy.get("div[class='document-instruction'] span[class='translate']").should('have.text', 'Document Upload Instructions')
    cy.get("pre[class='translate']").should('contain', 'Please Upload Your Valid Document here...')
    //Change Settings same Again
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.removeDocInstructions()
  })
  it('CA_CGCC_01 > This section will be mandatory and guest will not move without uploading document', () => {
    OnlineCheckInSettings_Elements.disableGuestPassportID()
    PreCheckIn_Elements.validateNewAddedBooking("Test Property")
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
    cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time').wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
    cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    cy.wait(3000)
    cy.get("p[class='upload-title'] span[class='translate']").should('contain', 'CREDIT CARD')
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}).wait(2000)
    cy.get("small[class='form-text text-danger my-0'] span[class='translate']").should('contain', 'Credit card is required.')
    const cardImage = 'Images/visaCard.png'
    cy.get("#credit_card_file")
      .attachFile(cardImage)
    cy.wait(5000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.get('div[class="gp-box gp-box-of-inner-pages"] p:nth-child(1)').should('have.text', 'Take a selfie to authenticate your identity')
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.enableGuestPassportID()
  })
  it("CA_CGCC_02 > If Booking's channel is not matching with selected booking source then this section will not show", () => {
    OnlineCheckInSettings_Elements.cardCardBookingSource('Direct')
    OnlineCheckInSettings_Elements.disableGuestPassportID()
    PreCheckIn_Elements.validateNewAddedBooking("Test Property")
    cy.get('.page-title.translate').should('contain', 'Bookings').wait(2000)
    OnlineCheckInSettings_Elements.goToArrivalBy()
    cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
    cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time').wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true}) 
    cy.get('div[class="gp-box gp-box-of-inner-pages"] p:nth-child(1)').should('have.text', 'Take a selfie to authenticate your identity')
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.cardCardBookingSource('All Booking Source')
    OnlineCheckInSettings_Elements.enableGuestPassportID()
  })

}) 

