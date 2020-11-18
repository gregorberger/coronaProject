package com.project.coronaProject;

public class AspektiBolnice {
    private Zasedenost beds;
    private Zasedenost icu;
    private Zasedenost vents;
    private Zasedenost care;

    public AspektiBolnice() {
        super();
    }

    public AspektiBolnice(Zasedenost beds, Zasedenost icu, Zasedenost vents, Zasedenost care) {
        this.beds = beds;
        this.icu = icu;
        this.vents = vents;
        this.care = care;
    }
     public Zasedenost getBeds() {
        return this.beds;
     }
     public Zasedenost getIcu() {
        return this.icu;
     }
     public Zasedenost getVents() {
        return this.vents;
     }
    public Zasedenost getCare() {
        return this.care;
    }
}
