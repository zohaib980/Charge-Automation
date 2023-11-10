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

describe('Pre Check-In Process', () => {
  beforeEach(() => {
    cy.visit('/')
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
  })

  it('CA_CPCT_01 > Validate Complete Pre Check-In Process with Source PMS-No-PMS, using document as ID Card, Arrival by Car, Only available Guests and using all Services', () => {
    OnlineCheckInSettings_Elements.basicInfoOriginalSettigs()
    Booking_Elements.happyAddBooking('Waqas DHA')
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
      // Will get and store BookingId value in a variable
      cy.get('#bookingID') 
      .invoke('val') 
      .then((text) => {
        const bookingID = text; 
        cy.wrap(bookingID).should('eq', bookingID)
        // Will get and store Source value in a variable
        cy.get('#source') 
        .invoke('val') 
        .then((text) => {
          const source = text; 
          cy.wrap(source).should('eq', source)
          // Will get and store CheckIn Date in a variable
          cy.get('#checkinDate') 
          .invoke('val') 
          .then((text) => {
            const checkInDate = text; 
            cy.wrap(checkInDate).should('eq', checkInDate)
            // Will get and store CheckOut Date in a variable
            cy.get('#checkoutDate')
            .invoke('val') 
            .then((text) => {
              const checkOutDate = text; 
              cy.wrap(checkOutDate).should('eq', checkOutDate)
              cy.scrollTo('bottom')
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
                  cy.scrollTo('top').wait(2000)
                  // Now user will go to Payments and Copy the Amount 
                  cy.get('#tab_general-payment-detail > .mt-sm-15')
                    .click({force: true})
                  cy.scrollTo('bottom')
                  cy.wait(2000)
                  cy.get('.col-md-4 > .table-responsive > .table > :nth-child(1) > .text-right') 
                  .then($text => {
                    const tAmount = $text.text(); 
                    cy.log(tAmount)
                    // User will logout from the portal and will open CheckIn link
                    Login_Elements.profileIcon()
                    cy.visit(link)
                    cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
                    cy.wait(2000)
                    cy.get('.welcome-guest-header > .mb-0').should('contain', 'Welcome').wait(3000)
                    // Validate Reference Number
                    cy.get('span.single-line.notranslate')
                    .then(($ref) => {
                      const referenceID = $ref.text().trim()
                      cy.wrap(bookingID).should('eq',referenceID)
                      // Validate Soruce type
                      cy.get('.gp-property-dl > :nth-child(2) > .notranslate')
                      .then(($sour) => {
                        const sourceType = $sour.text().trim()
                        cy.wrap(sourceType).should('eq',source)
                        // Validate Amount
                        cy.get(':nth-child(1) > :nth-child(2) > .dl-with-icon > .notranslate')
                        .then(($amount) => {
                          const amountTotal = $amount.text().trim()
                          cy.wrap(amountTotal).should('eq',tAmount)
                          // Validate check In date
                          cy.get(':nth-child(1) > .dl-with-icon > .notranslate')
                          .then($cIn => {
                            const dateCheckIn = $cIn.text().replace(/,/g, '');
                            cy.log(dateCheckIn)
                            cy.wrap(dateCheckIn).should('eq', checkInDate)
                            // Validate CheckOut Date
                            cy.get(':nth-child(2) > :nth-child(2) > .dl-with-icon > .notranslate')
                            .then($cOut => {
                              const dateCheckOut = $cOut.text().replace(/,/g, '');
                              cy.log(dateCheckOut)
                              cy.wrap(dateCheckOut).should('eq', checkOutDate).wait(3000)
                              cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
                              cy.get('h4 > .translate').should('contain', 'CONTACT INFORMATION')
                              cy.wait(3000)
                              //Here we will validate Full Name and Email entered during Booking
                              cy.xpath('(//input[@id="6"])[1]')
                              .invoke('val') 
                              .then((text) => {
                                const fullName = text; 
                                cy.wrap(fullName).should('eq', fName)
                                //Here we will validate Full Name and Email entered during Booking
                                cy.xpath('(//input[@id="1"])[1]')
                                .invoke('val') 
                                .then((text) => {
                                  const emailAddress = text; 
                                  cy.wrap(emailAddress).should('eq', emailText)
                                  PreCheckIn_Elements.arrivingByCar()
                                  // Guest Verification
                                  cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)')
                                    .should('have.text', 'Guest Details\n                        1/3')
                                  cy.get('table[class="table guest-table"] h6[class="guest-name"]')
                                  .then($text => {
                                    const guestName = $text.text(); 
                                    cy.log(guestName)
                                    cy.wrap(fName).should('eq', guestName) 
                                    cy.get("table[class='table guest-table'] span[class='guest-email']")
                                    .then($text => {
                                      const guestEmail = $text.text(); 
                                      cy.log(guestEmail)
                                      cy.wrap(emailText).should('eq', guestEmail)
                                      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
                                      PreCheckIn_Elements.allAddServices()
                                      // Validate Summary Page
                                      cy.get('.page-title').should('contain', 'Your Summary')
                                      cy.get('.mb-0.notranslate').should('contain', 'CA')
                                      cy.wait(3000)
                                      // Validate Source
                                      cy.get('div[class="gp-property-dl small"] span')
                                      .then(($sSource) => {
                                        const mySumSource = $sSource.text().replace(/Booked with /g, '')
                                        cy.log(mySumSource)
                                        cy.wrap(mySumSource).should('eq', source)
                                        // Validate Review Booking Detail
                                        cy.get('div[class="col"] h4').should('contain', 'REVIEW BOOKING DETAILS')
                                        cy.get('.col-md-12 > .row > :nth-child(1) > .gp-dl > dd')
                                        .then(($sRefNo) => {
                                          const myRefNo = $sRefNo.text()
                                          cy.log(myRefNo)
                                          cy.wrap(myRefNo).should('eq',bookingID)
                                          cy.get(':nth-child(2) > .gp-dl > .notranslate')
                                          .then(($sAmount) => {
                                            const mySumAmount = $sAmount.text()
                                            cy.log(mySumAmount)
                                            cy.wrap(mySumAmount).should('eq',tAmount)
                                            cy.get(':nth-child(3) > .gp-dl > .notranslate')
                                            .then(($sCIn) => {
                                              const myCheckInDate = $sCIn.text().replace(/,/g, '');
                                              cy.log(myCheckInDate)
                                              cy.wrap(myCheckInDate).should('eq', checkInDate)
                                              cy.get('.col-md-12 > .row > :nth-child(4) > .gp-dl > .notranslate')
                                              .then(($sCOut) => {
                                                const myCheckOutDate = $sCOut.text().replace(/,/g, '');
                                                cy.log(myCheckOutDate)
                                                cy.wrap(myCheckOutDate).should('eq', checkOutDate)
                                                // Validate Booking info
                                                cy.get(':nth-child(4) > .row > :nth-child(1) > .gp-dl > dd')
                                                .then($infoName => {
                                                  const myName = $infoName.text(); 
                                                  cy.log(myName)
                                                  cy.wrap(myName).should('eq', fName)
                                                  cy.get(':nth-child(5) > .gp-dl > dd')
                                                  .then($infoEmail => {
                                                    const myEmail = $infoEmail.text(); 
                                                    cy.log(myEmail)
                                                    cy.wrap(myEmail).should('eq', emailText)
                                                    PreCheckIn_Elements.idDocValidation()
                                                  })
                                                })
                                              })
                                            })
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })  
                          })
                        })
                      })          
                    })
                  })  
                })  
              })
            })
          })        
        })
      })            
    })
  })
  it('CA_CPCT_02 > Validate Complete Pre Check-In Process using document as Driving License, Arrival by other, add more Guests and using only one Service from all', () => {
    Booking_Elements.happyAddBooking('Waqas DHA')
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
      // Will get and store BookingId value in a variable
      cy.get('#bookingID') 
      .invoke('val') 
      .then((text) => {
        const bookingID = text; 
        cy.wrap(bookingID).should('eq', bookingID)
        // Will get and store Source value in a variable
        cy.get('#source') 
        .invoke('val') 
        .then((text) => {
          const source = text; 
          cy.wrap(source).should('eq', source)
          // Will get and store CheckIn Date in a variable
          cy.get('#checkinDate') 
          .invoke('val') 
          .then((text) => {
            const checkInDate = text; 
            cy.wrap(checkInDate).should('eq', checkInDate)
            // Will get and store CheckOut Date in a variable
            cy.get('#checkoutDate')
            .invoke('val') 
            .then((text) => {
              const checkOutDate = text; 
              cy.wrap(checkOutDate).should('eq', checkOutDate)
              cy.scrollTo('bottom')
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
                  cy.scrollTo('top').wait(2000)
                  // Now user will go to Payments and Copy the Amount 
                  cy.get('#tab_general-payment-detail > .mt-sm-15')
                    .click({force: true})
                  cy.scrollTo('bottom')
                  cy.wait(2000)
                  cy.get('.col-md-4 > .table-responsive > .table > :nth-child(1) > .text-right') 
                  .then($text => {
                    const tAmount = $text.text(); 
                    cy.log(tAmount)
                    // User will logout from the portal and will open CheckIn link
                    Login_Elements.profileIcon()
                    cy.visit(link)
                    cy.get('.text-md > span').should('contain', 'Please start Pre Check-in')
                    cy.wait(2000)
                    cy.get('.welcome-guest-header > .mb-0').should('contain', 'Welcome').wait(3000)
                    // Validate Reference Number
                    cy.get('span.single-line.notranslate')
                    .then(($ref) => {
                      const referenceID = $ref.text().trim()
                      cy.log(referenceID)
                      cy.wrap(referenceID).should('eq',bookingID)
                      // Validate Soruce type
                      cy.get('.gp-property-dl > :nth-child(2) > .notranslate')
                      .then(($sour) => {
                        const sourceType = $sour.text().trim()
                        cy.wrap(sourceType).should('eq',source)
                        // Validate Amount
                        cy.get(':nth-child(1) > :nth-child(2) > .dl-with-icon > .notranslate')
                        .then(($amount) => {
                          const amountTotal = $amount.text().trim()
                          cy.wrap(amountTotal).should('eq',tAmount)
                          // Validate check In date
                          cy.get(':nth-child(1) > .dl-with-icon > .notranslate')
                          .then($cIn => {
                            const dateCheckIn = $cIn.text().replace(/,/g, '');
                            cy.log(dateCheckIn)
                            cy.wrap(dateCheckIn).should('eq', checkInDate)
                            // Validate CheckOut Date
                            cy.get(':nth-child(2) > :nth-child(2) > .dl-with-icon > .notranslate')
                            .then($cOut => {
                              const dateCheckOut = $cOut.text().replace(/,/g, '');
                              cy.log(dateCheckOut)
                              cy.wrap(dateCheckOut).should('eq', checkOutDate).wait(3000)
                              cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
                              cy.get('h4 > .translate').should('contain', 'CONTACT INFORMATION')
                              cy.wait(3000)
                              //Here we will validate Full Name and Email entered during Booking
                              cy.xpath('(//input[@id="6"])[1]')
                              .invoke('val') 
                              .then((text) => {
                                const fullName = text; 
                                cy.wrap(fullName).should('eq', fName)
                                //Here we will validate Full Name and Email entered during Booking
                                cy.xpath('(//input[@id="1"])[1]')
                                .invoke('val') 
                                .then((text) => {
                                  const emailAddress = text; 
                                  cy.wrap(emailAddress).should('eq', emailText)
                                  PreCheckIn_Elements.addService1()
                                  // Validate Summary Page
                                  cy.get('.page-title').should('contain', 'Your Summary')
                                  cy.get('.mb-0.notranslate').should('contain', 'CA')
                                  cy.wait(3000)
                                  // Validate Source
                                  cy.get('div[class="gp-property-dl small"] span')
                                  .then(($sSource) => {
                                    const mySumSource = $sSource.text().replace(/Booked with /g, '')
                                    cy.log(mySumSource)
                                    cy.wrap(mySumSource).should('eq', source)
                                    // Validate Review Booking Detail
                                    cy.get('div[class="col"] h4').should('contain', 'REVIEW BOOKING DETAILS')
                                    cy.get('.col-md-12 > .row > :nth-child(1) > .gp-dl > dd')
                                    .then(($sRefNo) => {
                                      const myRefNo = $sRefNo.text()
                                      cy.log(myRefNo)
                                      cy.wrap(myRefNo).should('eq',bookingID)
                                      cy.get(':nth-child(2) > .gp-dl > .notranslate')
                                      .then(($sAmount) => {
                                        const mySumAmount = $sAmount.text()
                                        cy.log(mySumAmount)
                                        cy.wrap(mySumAmount).should('eq',tAmount)
                                        cy.get(':nth-child(3) > .gp-dl > .notranslate')
                                        .then(($sCIn) => {
                                          const myCheckInDate = $sCIn.text().replace(/,/g, '');
                                          cy.log(myCheckInDate)
                                          cy.wrap(myCheckInDate).should('eq', checkInDate)
                                          cy.get('.col-md-12 > .row > :nth-child(4) > .gp-dl > .notranslate')
                                          .then(($sCOut) => {
                                            const myCheckOutDate = $sCOut.text().replace(/,/g, '');
                                            cy.log(myCheckOutDate)
                                            cy.wrap(myCheckOutDate).should('eq', checkOutDate)
                                            // Validate Booking info
                                            cy.get(':nth-child(4) > .row > :nth-child(1) > .gp-dl > dd')
                                            .then($infoName => {
                                              const myName = $infoName.text(); 
                                              cy.log(myName)
                                              cy.wrap(myName).should('eq', fName)
                                              cy.get(':nth-child(5) > .gp-dl > dd')
                                              .then($infoEmail => {
                                                const myEmail = $infoEmail.text(); 
                                                cy.log(myEmail)
                                                cy.wrap(myEmail).should('eq', emailText)
                                                PreCheckIn_Elements.licenseDocValidation()
                                              })
                                            })
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })   
  })   
  it('CA_CPCT_03 > Validate Booking Guest PrecheckIn status when the Primary guest complete the pre CheckIn on booking listing page. ', () => {
    Booking_Elements.happyAddBooking('Waqas DHA')
    LandingPages_Elements.goToGuest()
    PreCheckIn_Elements.guestVerify()
    cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
    cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
    cy.get('label[for="add_on_check_598"]').click({force: true})
    cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
    .should('have.text', 'CA$100')
    .then($addsAmount => {
      const adds_on_total = $addsAmount.text(); 
      cy.log(adds_on_total)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
      .then($amountText => {
        const Total = $amountText.text(); 
        expect(Total).to.include(adds_on_total)
      })  
    })
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.wait(3000)
    PreCheckIn_Elements.signatureValidation()
    cy.visit('/')
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    cy.get("a[class='nav-item nav-link']").contains('Bookings').click()
    cy.url().should('include', '/bookings')
    cy.xpath("(//span[@class='translate'][normalize-space()='Pre check-in completed'])[1]")
    .should('contain', 'Pre check-in completed')
  }) 
  it("CA_CPCT_04 > Validate Under 'Who is required to Complete the Above Details?' setting if only primary guest is selected then pre-checkin will get completed when primary guest complete pre-checkin and also 2 emails sent for Pre Check-in Completed one is for guest and second one for client", () => {
    OnlineCheckInSettings_Elements.selectOnlyPrimaryGuest()
    Booking_Elements.happyAddBooking('Waqas DHA')
    LandingPages_Elements.goToGuest()
    cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
    cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
    cy.get('label[for="add_on_check_598"]').click({force: true})
    cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
    .should('have.text', 'CA$100')
    .then($addsAmount => {
      const adds_on_total = $addsAmount.text(); 
      cy.log(adds_on_total)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
      .then($amountText => {
        const Total = $amountText.text(); 
        expect(Total).to.include(adds_on_total)
      })  
    })
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.wait(3000)
    PreCheckIn_Elements.signatureValidation()
    cy.visit('/')
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    // Go to booking detail and Validate Mails
    OnlineCheckInSettings_Elements.mailValidation()
    OnlineCheckInSettings_Elements.adultChildrenBabiesWithPrimaryGuest() 
  })
  it("CA_CPCT_05 > Validate Under Who is required to Complete the Above Details? with All Guests (Adult, Children and Babies) is selected “When primary guest completes it” under When is pre check-in considered completed? settings then guest will tab and mark completed when Only the primary guest complete the pre-checkin and also 2 emails sent for Pre Check-in Completed one is for main guest and second one for client", () => {
    Booking_Elements.happyAddBooking('Waqas DHA')
    // Add New booking
    LandingPages_Elements.goToGuest()
    PreCheckIn_Elements.guestVerify()
    cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
    cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
    cy.get('label[for="add_on_check_598"]').click({force: true})
    cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
    .should('have.text', 'CA$100')
    .then($addsAmount => {
      const adds_on_total = $addsAmount.text(); 
      cy.log(adds_on_total)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
      .then($amountText => {
        const Total = $amountText.text(); 
        expect(Total).to.include(adds_on_total)
      })  
    })
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.wait(3000)
    PreCheckIn_Elements.signatureValidation()
    cy.visit('/')
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    // Go to booking detail and Validate Mails
    OnlineCheckInSettings_Elements.mailValidation()  
  })
  it("CA_CPCT_06 > Validate Under Who is required to Complete the Above Details? with All Guests (Adult, Children and Babies) is selected ”When all required guests complete it” under When is pre check-in considered completed? settings then guest will tab and mark completed when all guests complete the pre-checkin and also 2 emails sent for Pre Check-in Completed one is for main guest and second one for client", () => {
    OnlineCheckInSettings_Elements.selectWhenAllGuestRequired()
    Booking_Elements.happyAddBooking('Waqas DHA')
    LandingPages_Elements.goToGuest()
    OnlineCheckInSettings_Elements.addGuestDetail()
    OnlineCheckInSettings_Elements.addChildDetail()
    cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
    cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
    cy.get('label[for="add_on_check_598"]').click({force: true})
    cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
    .should('have.text', 'CA$100')
    .then($addsAmount => {
      const adds_on_total = $addsAmount.text(); 
      cy.log(adds_on_total)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
      .then($amountText => {
        const Total = $amountText.text(); 
        expect(Total).to.include(adds_on_total)
      })  
    })
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.wait(3000)
    PreCheckIn_Elements.signatureValidation()
    cy.visit('/')
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    // Go to booking detail and Validate Mails
    OnlineCheckInSettings_Elements.mailValidation()
    OnlineCheckInSettings_Elements.basicInfoOriginalSettigs()
  })
  it('CA_CPCT_07 > Under "Who is required to Complete the Above Details?" and "All Guests (Over 18)" is selected “When primary guest completes it” under "When is pre check-in considered completed?" settings then guest will tab and mark completed when "All Guests (Over 18)" complete the pre-checkin and also 2 emails sent for "Pre Check-in Completed" one is for main guest and second one for client', () => {
    OnlineCheckInSettings_Elements.allGuestOver18WithPrimary()
    Booking_Elements.happyAddBooking('Waqas DHA')
    LandingPages_Elements.goToGuest()
    cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        1/2')
    cy.wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
    cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
    cy.get('label[for="add_on_check_598"]').click({force: true})
    cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
    .should('have.text', 'CA$100')
    .then($addsAmount => {
      const adds_on_total = $addsAmount.text(); 
      cy.log(adds_on_total)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
      .then($amountText => {
        const Total = $amountText.text(); 
        expect(Total).to.include(adds_on_total)
      })  
    })
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.wait(3000)
    PreCheckIn_Elements.signatureValidation()
    cy.visit('/')
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    // Go to booking detail and Validate Mails
    OnlineCheckInSettings_Elements.mailValidation()
    OnlineCheckInSettings_Elements.basicInfoOriginalSettigs()
  })
  it('CA_CPCT_08 > Under "Who is required to Complete the Above Details?" and "All Guests (Over 18)" is selected ”When all required guests complete it” under "When is pre check-in considered completed?" settings then guest will tab and mark completed when "All Guests (Over 18)" complete the pre-checkin and also 2 emails sent for "Pre Check-in Completed" one is for main guest and second one for client', () => {
    OnlineCheckInSettings_Elements.allGuestOver18WithAll()
    Booking_Elements.happyAddBooking('Waqas DHA')
    LandingPages_Elements.goToGuest()
    cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        1/2')
    OnlineCheckInSettings_Elements.addGuestDetail()
    cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        2/2')
    cy.wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
    cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
    cy.get('label[for="add_on_check_598"]').click({force: true})
    cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
    .should('have.text', 'CA$100')
    .then($addsAmount => {
      const adds_on_total = $addsAmount.text(); 
      cy.log(adds_on_total)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
      .then($amountText => {
        const Total = $amountText.text(); 
        expect(Total).to.include(adds_on_total)
      })  
    })
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.wait(3000)
    PreCheckIn_Elements.signatureValidation()
    cy.visit('/')
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    // Go to booking detail and Validate Mails
    OnlineCheckInSettings_Elements.mailValidation()
    OnlineCheckInSettings_Elements.basicInfoOriginalSettigs()
  })
  it('CA_CPCT_09 > Validate If user try to complete the Pre CheckIn process without filling All Guest detail above 18. They will be able to complete it but Pre checkin will be considered incomplete', () => {
    OnlineCheckInSettings_Elements.allGuestOver18WithAll()
    Booking_Elements.happyAddBooking('Waqas DHA')
    LandingPages_Elements.goToGuest()
    cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        1/2')
    cy.wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
    cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
    cy.get('label[for="add_on_check_598"]').click({force: true})
    cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
    .should('have.text', 'CA$100')
    .then($addsAmount => {
      const adds_on_total = $addsAmount.text(); 
      cy.log(adds_on_total)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
      .then($amountText => {
        const Total = $amountText.text(); 
        expect(Total).to.include(adds_on_total)
      })  
    })
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.wait(3000)
    PreCheckIn_Elements.signatureValidation()
    cy.get('.col-sm-9 > .translate').should('contain', 'Guest(s) details missing!')
    cy.get('.col-sm-3 > .btn > .translate').should('have.text', 'Update Now')
    cy.visit('/')
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    cy.get("a[class='nav-item nav-link']").contains('Bookings').click()
    cy.url().should('include', '/bookings')
    cy.get('.page-title.translate').should('contain', 'Bookings')
    cy.xpath("(//span[@class='translate'])[19]").should('contain', 'Pre check-in incomplete')
    OnlineCheckInSettings_Elements.basicInfoOriginalSettigs()
  })
  it('CA_CPCT_10 > Validate If user try to complete the Pre CheckIn process without filling all Guest detail (Adult, Children and Babies). They will be able to complete it but Pre checkin will be considered incomplete', () => {
    OnlineCheckInSettings_Elements.selectWhenAllGuestRequired()
    Booking_Elements.happyAddBooking('Waqas DHA')
    LandingPages_Elements.goToGuest()
    cy.get('div[class="gp-box gp-box-of-inner-pages page-tab-01 pre-checkin-tabs"] h4:nth-child(1)').should('have.text', 'Guest Details\n                        1/3')
    cy.wait(3000)
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.get('div[class="gp-inset"] div:nth-child(1) div:nth-child(2) div:nth-child(2) h3:nth-child(1) span:nth-child(1)').should('have.text', 'Test Upshell')
    cy.xpath('//span[normalize-space()="E-bike Rental"]').should('have.text', 'E-bike Rental')
    cy.get('label[for="add_on_check_598"]').click({force: true})
    cy.get('div[class="text-center mt-4 lead fw-500"] span[class="notranslate"]')
    .should('have.text', 'CA$100')
    .then($addsAmount => {
      const adds_on_total = $addsAmount.text(); 
      cy.log(adds_on_total)
      cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
      cy.get('.col-md-4 > .table-responsive > .table > tr > .text-right')
      .then($amountText => {
        const Total = $amountText.text(); 
        expect(Total).to.include(adds_on_total)
      })  
    })
    cy.get('[data-test="precheckinSaveBtnOne"]').should('be.visible').click({force: true})
    cy.wait(3000)
    PreCheckIn_Elements.signatureValidation()
    cy.get('.col-sm-9 > .translate').should('contain', 'Guest(s) details missing!')
    cy.get('.col-sm-3 > .btn > .translate').should('have.text', 'Update Now')
    cy.visit('/')
    Login_Elements.happyLogin('automation9462@gmail.com', 'Boring321')
    cy.get("a[class='nav-item nav-link']").contains('Bookings').click()
    cy.url().should('include', '/bookings')
    cy.get('.page-title.translate').should('contain', 'Bookings')
    cy.xpath("(//span[@class='translate'])[19]").should('contain', 'Pre check-in incomplete')
    OnlineCheckInSettings_Elements.basicInfoOriginalSettigs()
  })
}) 

