describe('Successfully Sign-in to Asgardeo ', () => {

    before(() => {

        cy.window().then((win) => {
            win.onbeforeunload = null;
        });
        // Visit Asgardeo console
        cy.visit("https://dev.console.asgardeo.io/", {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear();
            }
        });
    });

    it("User try to successfully Sign-in", () => {

        //Provide username & press Enter.
        cy.get("#usernameUserInput").type("niluka@wso2.com{enter}", { log: false });

        //Provide Password & Press Enter
        cy.get("[data-testid=\"login-page-password-input\"]").type("Wso2@1234{enter}", { log: false });

        // Validate whether user able to successfully sign-in.
        cy.get("[data-testid=\"welcome-greeting-header\"]").should("contain", "Welcome")
    });
});

/**
 * returning false here prevents Cypress from failing the test
 * expect(err.message).to.include('Ignoring error for now');
 */
Cypress.on("uncaught:exception", (err, runnable) => {

    console.log("Cypress detected uncaught exception", err);
    return false;
}); 