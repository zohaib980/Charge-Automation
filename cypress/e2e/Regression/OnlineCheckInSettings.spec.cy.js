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
  // Add New booking
    Booking_Elements.happyAddBooking("QA Test Property")
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
      cy.wait(3000)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get("div[class='card-wrap-border stripe-add-card'] h4").should('contain', '+ ADD CREDIT CARD')
    })
  })
 it('CA_CBIFG_02 > Validate when Collect Basic Information From Guest(s) toggle is disable', () => {
  OnlineCheckInSettings_Elements.disableBasicInfoToggle()
   // Add New booking
   Booking_Elements.happyAddBooking("QA Test Property")
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
     cy.get("div[class='card-wrap-border stripe-add-card'] h4").should('contain', '+ ADD CREDIT CARD')
     // Change Settings same Again
     cy.visit('/')
     Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
     OnlineCheckInSettings_Elements.disableBasicInfoToggle()
    })
  }) 
  it("CA_CBIFG_03 > Validate If all items are disabled from collect basic details section then this section will also be disabled and will not show on pre-checkin", () => {
    OnlineCheckInSettings_Elements.uncheckAllCollectBasicDetailCheckboxes()
    // Add New booking
    Booking_Elements.happyAddBooking("QA Test Property")
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
      cy.get("div[class='card-wrap-border stripe-add-card'] h4").should('contain', '+ ADD CREDIT CARD')
      // Change Settings same Again
      cy.visit('/')
      Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
      OnlineCheckInSettings_Elements.checkAllCollectBasicDetailCheckboxes()
    })
  })
  it("CA_CBIFG_04 > Validate Collect Basic Information From will show only for selected booking source from the list", () => {
    OnlineCheckInSettings_Elements.selectLimitedBookingSource()
    // Add New booking
    Booking_Elements.happyAddBooking("QA Test Property")
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
              cy.get("div[class='card-wrap-border stripe-add-card'] h4").should('contain', '+ ADD CREDIT CARD')
              // Change Settings same Again
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
    Booking_Elements.happyAddBooking("QA Test Property")
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.xpath("(//a[@class='dropdown-item notranslate'])[1]")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      Login_Elements.profileIcon()
      cy.visit(link)
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
      cy.wait(3000)
      PreCheckIn_Elements.creditCard()
      cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    })
    //Change Settings same Again
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
  })
  it("CA_CITG_02 > If Booking's channel of Arrival source is not matching with selected booking source then this section will not show", () => {
    OnlineCheckInSettings_Elements.enableArrivalByToggle('Direct')
    Booking_Elements.happyAddBooking("QA Test Property")
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.xpath("(//a[@class='dropdown-item notranslate'])[1]")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      Login_Elements.profileIcon()
      cy.visit(link)
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
      cy.wait(3000)
      PreCheckIn_Elements.creditCard()
      cy.get("div[class='form-section-title'] h4").should('contain', 'Upload copy of valid Driver License')
    })
    //Change Settings same Again
    cy.visit('/')
    Login_Elements.happyLogin('automationca2@yopmail.com', 'Boring321')
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
  })
  it('CA_CITG_03 > Default "Estimate Arrival Time" should property "Standard Check-In" If available', () => {
    OnlineCheckInSettings_Elements.enableArrivalByToggle('All Booking Source')
    Booking_Elements.happyAddBooking("Test Property")
    cy.xpath("(//i[@class='fas fa-ellipsis-h'])[2]")
    .click({force: true})
    cy.xpath("(//a[@class='dropdown-item notranslate'])[1]")
    .then(($button) => {
      const link = $button.attr('href');
      cy.wrap(link).as('myLink');
      cy.log(link)
      Login_Elements.profileIcon()
      cy.visit(link)
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
      cy.wait(3000)
      PreCheckIn_Elements.creditCard()
      cy.get('div[class="form-section-title mb-2"] h4').should('have.text', 'ARRIVAL INFORMATION').wait(3000)
      cy.get('label[for="standard_check_in_time"]').should('have.text', 'Estimate Arrival Time')
      cy.get("#standard_check_in_time").should('contain', '4:00')
    })
  })
}) 

