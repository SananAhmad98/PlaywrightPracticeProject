Feature: Ecommerce Validations

    @Regression
    Scenario: Placing Order
    Given a login to e-commerce application with "sananahmad98@gmail.com" and "webdir123R"
    When Add product to cart
    Then Verify product is displayed in the cart
    When Enter valid details such as "123", "SANAN AHMAD", "rahulshettyacademy", "Ind", and then place the Order
    Then Verify if order is present in Order History