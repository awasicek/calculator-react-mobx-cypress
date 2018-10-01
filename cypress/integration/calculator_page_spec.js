// https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-a-Simple-Test
// A solid test generally covers 3 phases:
//
// 1. Arrange -- Set up the application state. (aka given)
// 2. Act -- Take an action. (aka when)
// 3. Assert -- Make an assertion about the resulting application state. (aka then)

describe('Calculator Page', function() {
   // note: arrow functions are discouraged because they lexically bind this and
   // cannot access the Mocha context
   it('successfully loads', function() {
      cy.visit('/');
   });
});

describe('Query Essential Elements', function() {
   it('finds essential elements', function() {
       cy.get('#app');
       cy.get('#calculator');
       cy.get('#display');
       cy.get('#btn_one');
       cy.get('#btn_two');
       cy.get('#btn_three');
       cy.get('#btn_four');
       cy.get('#btn_five');
       cy.get('#btn_six');
       cy.get('#btn_seven');
       cy.get('#btn_eight');
       cy.get('#btn_nine');
       cy.get('#btn_zero');
       cy.get('#btn_decimal');
       cy.get('#btn_clear');
       cy.get('#btn_divide');
       cy.get('#btn_multiply');
       cy.get('#btn_subtract');
       cy.get('#btn_add');
       cy.get('#btn_equals');
       cy.get('#btn_allClear');
   });
});

describe('Verify Pure Numeric Input', function() {
   it('checks basic number input', function() {
       cy.get('#btn_one')
          .click();
       cy.get('#display')
          .should('have.text', '1');
       cy.get('#btn_two')
           .click();
       cy.get('#display')
           .should('have.text', '12');
       cy.get('#btn_three')
           .click();
       cy.get('#display')
           .should('have.text', '123');
       cy.get('#btn_four')
           .click();
       cy.get('#display')
           .should('have.text', '1234');
       cy.get('#btn_five')
           .click();
       cy.get('#display')
           .should('have.text', '12345');
       cy.get('#btn_six')
           .click();
       cy.get('#display')
           .should('have.text', '123456');
       cy.get('#btn_seven')
           .click();
       cy.get('#display')
           .should('have.text', '1234567');
       cy.get('#btn_eight')
           .click();
       cy.get('#display')
           .should('have.text', '12345678');
       cy.get('#btn_nine')
           .click();
       cy.get('#display')
           .should('have.text', '123456789');
       cy.get('#btn_zero')
           .click();
       cy.get('#display')
           .should('have.text', '1234567890');
   });
});

describe('Verify All Clear', function() {
    it('checks all clear functionality', function() {
        let $display = Cypress.$('#display');
        expect($display).to.have.text('1234567890');
        cy.get('#btn_allClear')
            .click();
        cy.get('#display')
            .should('have.text', '0');
    });
});

describe('Verify Decimal Input', function() {
    it('checks numeric decimal input', function() {
        cy.get('#btn_one')
            .click();
        cy.get('#btn_decimal')
            .click();
        cy.get('#display')
            .should('have.text', '1.');
        cy.get('#btn_five')
            .click();
        cy.get('#display')
            .should('have.text', '1.5');
    });
    it('multiple decimal inputs when number already has a decimal', function() {
        cy.get('#btn_decimal')
            .click();
        cy.get('#display')
            .should('have.text', '1.5');
        cy.get('#btn_decimal')
            .click();
        cy.get('#display')
            .should('have.text', '1.5');
        cy.get('#btn_allClear')
            .click();
    });
    it('start with zero then input decimal', function() {
        cy.get('#display')
            .should('have.text', '0');
        cy.get('#btn_decimal')
            .click();
        cy.get('#display')
            .should('have.text', '0.');
        cy.get('#btn_three')
            .click();
        cy.get('#display')
            .should('have.text', '0.3');
        cy.get('#btn_three')
            .click();
        cy.get('#display')
            .should('have.text', '0.33');
        cy.get('#btn_allClear')
            .click();
    });
});

describe('Verify Equals', function() {
    it('checks equals without operators', function() {
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '0');
    });
    it('checks equals after using an operator', function() {
        // 8 + 2 = 10
        cy.get('#btn_eight')
            .click();
        cy.get('#btn_add')
            .click();
        cy.get('#btn_two')
            .click();
        cy.get('#display') // still displays two before equals (or chaining)
            .should('have.text', '2');
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '10');
    });
    it('subsequent equal sign input', function() {
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '10');
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '10');
        cy.get('#btn_allClear')
            .click();
    });
});

describe('Basic Negative Output', function() {
    it('checks negative output', function() {
        // 1 - 5 = -4
        cy.get('#btn_one')
            .click();
        cy.get('#btn_subtract')
            .click();
        cy.get('#btn_five')
            .click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '-4');
        cy.get('#btn_allClear')
            .click();
    });
});

describe('Verify Floating Point Precision', function() {
    it('checks floating point precision', function() {
        // 1.2 - 2.7 = -1.5 but "regular" JS math would result in -1.5000000000000002
        cy.get('#btn_one')
            .click();
        cy.get('#btn_decimal')
            .click();
        cy.get('#btn_two')
            .click();
        cy.get('#btn_subtract')
            .click();
        cy.get('#btn_two')
            .click();
        cy.get('#btn_decimal')
            .click();
        cy.get('#btn_seven')
            .click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '-1.5');
        cy.get('#btn_allClear')
            .click();
    })
});

describe('Verify Addition', function() {
    it('integer addition', function() {
        // 1 + 2 = 3
        cy.get('#btn_one')
            .click();
        cy.get('#btn_add')
            .click();
        cy.get('#btn_two')
            .click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '3');
        cy.get('#btn_allClear')
            .click();
    });
    it('fractional addition', function() {
        // 5.2 + 5.75 = 10.95
        cy.get('#btn_five')
            .click();
        cy.get('#btn_decimal')
            .click();
        cy.get('#btn_two')
            .click();
        cy.get('#btn_add')
            .click();
        cy.get('#btn_five')
            .click();
        cy.get('#btn_decimal')
            .click();
        cy.get('#btn_seven')
            .click();
        cy.get('#btn_five')
            .click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '10.95');
        cy.get('#btn_allClear')
            .click();
    });
});

describe('Verify Subtraction', function() {
    it('integer subtraction', function() {
        // 4 - 1 = 3
        cy.get('#btn_four')
            .click();
        cy.get('#btn_subtract')
            .click();
        cy.get('#btn_one')
            .click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '3');
        cy.get('#btn_allClear')
            .click();
    });
    it('fractional subtraction', function() {
        // 80.3333 - 0.3333 = 88
        cy.get('#btn_eight')
            .click().click();
        cy.get('#btn_decimal')
            .click();
        cy.get('#btn_three')
            .click().click().click().click();
        cy.get('#btn_subtract')
            .click();
        cy.get('#btn_decimal')
            .click();
        cy.get('#btn_three')
            .click().click().click().click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '88');
        cy.get('#btn_allClear')
            .click();
    });
});

describe('Verify Multiplication', function() {
    it('integer multiplication', function() {
        // 9 * 50 = 450
        cy.get('#btn_nine')
            .click();
        cy.get('#btn_multiply')
            .click();
        cy.get('#btn_five')
            .click();
        cy.get('#btn_zero')
            .click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '450');
        cy.get('#btn_allClear')
            .click();
    });
    it('fractional multiplication', function() {
        // 0.9 * 200 = 180
        cy.get('#btn_decimal')
            .click();
        cy.get('#btn_nine')
            .click();
        cy.get('#btn_multiply')
            .click();
        cy.get('#btn_two')
            .click();
        cy.get('#btn_zero')
            .click().click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '180');
        cy.get('#btn_allClear')
            .click();
    });
});

describe('Verify Division', function() {
    it('integer division', function() {
        // 30 / 3 = 10
        cy.get('#btn_three')
            .click();
        cy.get('#btn_zero')
            .click();
        cy.get('#btn_divide')
            .click();
        cy.get('#btn_three')
            .click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '10');
        cy.get('#btn_allClear')
            .click();
    });
    it('fractional division', function() {
        // 5.55 / 2.2 = 2.52272727272727272727
        cy.get('#btn_five')
            .click();
        cy.get('#btn_decimal')
            .click();
        cy.get('#btn_five')
            .click().click();
        cy.get('#btn_divide')
            .click();
        cy.get('#btn_two')
            .click();
        cy.get('#btn_decimal')
            .click();
        cy.get('#btn_two')
            .click();
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '2.52272727272727272727');
        cy.get('#btn_allClear')
            .click();
    });
});

describe('Chaining Operators', function() {
    it('checks chaining operators', function() {
        // (((5 + 3) - 2) * 10) / 3) = 20
        cy.get('#btn_five')
            .click();
        cy.get('#btn_add')
            .click();
        cy.get('#btn_three')
            .click();
        cy.get('#btn_subtract')
            .click();
        cy.get('#display')
            .should('have.text', '8');
        cy.get('#btn_two')
            .click();
        cy.get('#display')
            .should('have.text', '2');
        cy.get('#btn_multiply')
            .click();
        cy.get('#display')
            .should('have.text', '6');
        cy.get('#btn_one')
            .click();
        cy.get('#btn_zero')
            .click();
        cy.get('#display')
            .should('have.text', '10');
        cy.get('#btn_divide')
            .click();
        cy.get('#display')
            .should('have.text', '60');
        cy.get('#btn_three')
            .click();
        cy.get('#display')
            .should('have.text', '3');
        cy.get('#btn_equals')
            .click();
        cy.get('#display')
            .should('have.text', '20');
        cy.get('#btn_allClear')
            .click();
    });
});



// describe('Verify Operations with Negative Numbers', function() {
//     it('exercises the operators with negative numbers', function() {
//
//
//         cy.get('#btn_allClear')
//             .click();
//     });
// });

// cypress jquery --        let $display = Cypress.$('#display');
//
// describe('My First Query for an Element Test', function() {
//     it('finds the content "type"', function() {
//         cy.visit('https://example.cypress.io');
//         cy.contains('type');
//         // cy.contains('hype'); // fails because never can find this element
//     });
// });
//
// describe('My First Click Element Test', function() {
//     it('clicks the link "type"', function() {
//         cy.visit('https://example.cypress.io');
//         cy.contains('type').click();
//     });
// });
//
// describe('My First Assertion Test', function() {
//     it("clicking 'type' navigates to a new url", function() {
//         cy.visit('https://example.cypress.io');
//         cy.contains('type').click();
//         // Should be on a new URL which includes '/commands/actions'
//         cy.url().should('include', '/commands/actions');
//     });
// });
//
// describe('My First Test Adding More Commands and Assertions', function() {
//     it("Gets, types, and asserts", function() {
//         cy.visit('https://example.cypress.io');
//         cy.pause(); // pauses the test at this point and allows us to step through (like the debugger)
//         cy.contains('type').click();
//         // Should be on a new URL which includes '/commands/actions'
//         cy.url().should('include', '/commands/actions');
//         // Get an input, type into it, and verify that the value has been updated
//         cy.get('.action-email')
//             .type('fake@email.com')
//             .should('have.value', 'fake@email.com');
//     });
// });
