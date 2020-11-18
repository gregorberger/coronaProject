package com.project.coronaProject;


public class Hospital {
    private int year;
    private int month;
    private int day;
    private AspektiBolnice overall;
    private BolniceKraji perHospital;

    public Hospital() {
        super();
    }

    public Hospital(int year, int month, int day, AspektiBolnice overall, BolniceKraji perHospital) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.overall = overall;
        this.perHospital = perHospital;
    }

    public int getYear() {
        return this.year;
    }
    public int getMonth() {
        return this.month;
    }
    public int getDay() {
        return this.day;
    }
    public BolniceKraji getPerHospital() {
        return this.perHospital;
    }
    public  AspektiBolnice getOverall(){
        return this.overall;
    }
}
