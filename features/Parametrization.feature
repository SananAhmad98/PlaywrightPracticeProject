Feature: Parametrization Scenarios

    @Smoke
    @Regression
    Scenario Outline: Invalid Login
    Given a login to e-commerce application-3 with "<username>" and "<password>"
    Then Verify all crendentials are incorrect

    Examples:
        | username                |password| 
        | sananahmad09@gamil.com  |webdir123RR|
        | sananahmad98@gmail.com  |webdir123R|