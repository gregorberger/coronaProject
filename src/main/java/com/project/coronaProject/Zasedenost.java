package com.project.coronaProject;

public class Zasedenost {
    private int total;
    private int max;
    private int occupied;
    private int free;
    private int maxFree;

    public Zasedenost() {
        super();
    }

    public Zasedenost(int total, int max, int occupied, int free, int maxFree) {
        this.total = total;
        this.max = max;
        this.occupied = occupied;
        this.free = free;
        this.maxFree = maxFree;
    }

    public int getTotal() {
        return total;
    }
    public int getMax() {
        return max;
    }
    public int getOccupied() {
        return occupied;
    }
    public int getFree() {
        return free;
    }
    public int getMaxFree() {
        return maxFree;
    }

}
