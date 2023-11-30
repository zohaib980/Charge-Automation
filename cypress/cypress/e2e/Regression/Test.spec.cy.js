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


  describe('Toggle Testing', () => {
    it('Check and Toggle', () => {

    })
  })

