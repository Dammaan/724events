/* eslint-disable no-unused-vars */
import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
  
  it("displays slides in ascending order by date (oldest first)", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
  
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
  
    // Attendre les 3 titres (vérifie qu'ils sont rendus)
    const first = await screen.findByText("World Farming Day");
    const second = await screen.findByText("World economic forum");
    const third = await screen.findByText("World Gaming Day");
  
    // Récupère tous les titres dans l'ordre 
    const allTitles = screen.getAllByRole("heading");
  
    // Vérifie l'ordre chronologique (ancien -> récent)
    expect(allTitles[0]).toHaveTextContent("World Farming Day");
    expect(allTitles[1]).toHaveTextContent("World economic forum");
    expect(allTitles[2]).toHaveTextContent("World Gaming Day");    
  });

  it("displays pagination dots and the correct one is active", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
  
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
  
    // Vérifie affichage des slides
    await screen.findByText("World Farming Day");
  
    // Récupère tous les inputs radio
    const dots = screen.getAllByRole("radio");
  
    // autant de dots que d'éléments focus
    expect(dots.length).toBe(data.focus.length);
  
    // Vérifie que le premier est coché 
    expect(dots[0]).toBeChecked();
  
    //  les autres non
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < dots.length; i++) {
      expect(dots[i]).not.toBeChecked();
    }
  });
});
