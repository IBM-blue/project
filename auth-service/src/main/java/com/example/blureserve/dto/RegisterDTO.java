package com.example.blureserve.dto;

public class RegisterDTO {
    private String username;
    private String password;
    private String email;
    private String managerID

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setManagerID(String managerID){
        this.managerID=managerID;
   }


   public String getManagerID() {
        return managerID;
   }


}
