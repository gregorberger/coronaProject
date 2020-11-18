package com.project.coronaProject;

public class Brezposelni {
    private String month;
    private int JVSlo;
    private int kor;
    private int pod;
    private int pom;
    private int pos;
    private int primNot;
    private int sav;
    private int zas;
    private int gor;
    private int goris;
    private int obalnakraska;
    private int osred;

    public Brezposelni(String month, int JVSlo, int kor, int pod, int pom, int pos, int primNot,
                       int sav, int zas, int gor, int goris, int obalnakraska, int osred){
        this.month = month;
        this.JVSlo = JVSlo;
        this.kor = kor;
        this.pod = pod;
        this.pom = pom;
        this.pos = pos;
        this.primNot = primNot;
        this.sav = sav;
        this.zas = zas;
        this.gor = gor;
        this.goris = goris;
        this.obalnakraska = obalnakraska;
        this.osred = osred;
    }

    public String getMonth() {
        return month;
    }

    public int getJVSlo() {
        return JVSlo;
    }

    public int getKor() {
        return kor;
    }

    public int getPod() {
        return pod;
    }

    public int getPom() {
        return pom;
    }

    public int getPos() {
        return pos;
    }

    public int getPrimNot() {
        return primNot;
    }

    public int getZas() {
        return zas;
    }

    public int getSav() {
        return sav;
    }

    public int getGor() {
        return gor;
    }

    public int getGoris() {
        return goris;
    }

    public int getObalnakraska() {
        return obalnakraska;
    }

    public int getOsred() {
        return osred;
    }
}
