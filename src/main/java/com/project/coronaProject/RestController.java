package com.project.coronaProject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.ui.Model;


@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/hospital")
    public String hospital(Model model){
        Hospital[] hospitals = restTemplate.getForObject("https://api.sledilnik.org/api/hospitals", Hospital[].class);
        String vent="";
        for(Hospital h : hospitals) {
            vent += "UKCLJ - "+ Integer.toString(h.getDay())+". "+ Integer.toString(h.getMonth())+". "+Integer.toString(h.getYear())+
            " prosti:"+Integer.toString(h.getPerHospital().ukclj.getVents().getFree())+
            " zasedeni: "+Integer.toString(h.getPerHospital().ukclj.getVents().getFree());
            vent+="\r\n";
        }
        //model.addAllAttributes(hospitals);
        return vent;
    }
}
