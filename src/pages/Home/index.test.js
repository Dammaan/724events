import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("a list of events is displayed", async () => {
    const title = screen.getByTestId("event-section-title");
    expect(title).toBeInTheDocument();

  });

  it("a list of people is displayed", async () => {
    const person1 = screen.getByText("Samira");
    const person2 = screen.getByText("Isabelle");
    const person3 = screen.getByText("Jean-baptiste");
    expect(person1).toBeInTheDocument();
    expect(person2).toBeInTheDocument();
    expect(person3).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent("Notre derniére prestation");
    expect(footer).toHaveTextContent("Contactez-nous");
  });

  it("an event card, with the last event, is displayed", async () => {
    const lastEventTitle = await screen.findByText(/notre derniére prestation/i);
    expect(lastEventTitle).toBeInTheDocument();
  });
});
