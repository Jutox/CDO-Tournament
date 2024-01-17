package com.example.cdo_tournament_backend.model;

import java.util.Arrays;
import java.util.List;

public enum Role {
    
    PLAYER(Arrays.asList(Permission.READ_ALL_MODELS)),
    COACH(Arrays.asList(Permission.SAVE_ALL_MODELS, Permission.READ_ALL_MODELS));

    private List<Permission> permission;

    private Role(List<Permission> permission) {
        this.permission = permission;
    }

    public List<Permission> getPermission() {
        return permission;
    }

    public void setPermission(List<Permission> permission) {
        this.permission = permission;
    }

}