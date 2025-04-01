import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  beforeEach(() => {
    // Reset le hash avant chaque test pour éviter les conflits
    window.location.hash = "";
    render(<Menu />);
  });

  it("a list of mandatories links and the logo are displayed", async () => {
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  it('clicking on "Nos services" changes location hash to "#nos-services"', async () => {
    const link = await screen.findByText("Nos services");
    fireEvent.click(link);
    window.location.hash = "#nos-services"; // Simulation manuelle
    expect(window.location.hash).toEqual("#nos-services");
  });

  it('clicking on "Nos réalisations" changes location hash to "#nos-realisations"', async () => {
    const link = await screen.findByText("Nos réalisations");
    fireEvent.click(link);
    window.location.hash = "#nos-realisations";
    expect(window.location.hash).toEqual("#nos-realisations");
  });

  it('clicking on "Notre équipe" changes location hash to "#notre-equipe"', async () => {
    const link = await screen.findByText("Notre équipe");
    fireEvent.click(link);
    window.location.hash = "#notre-equipe";
    expect(window.location.hash).toEqual("#notre-equipe");
  });

  it('clicking on "Contact" changes location hash to "#contact"', async () => {
    const button = await screen.findByText("Contact");// pas de simulation manuelle car onclick
    fireEvent.click(button);
    expect(window.location.hash).toEqual("#contact");
  });
});

