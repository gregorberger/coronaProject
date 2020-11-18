package com.project.coronaProject;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MainController {

    @GetMapping("/")
    public String main(Model model) {
        model.addAttribute("ime", "ekipa");
        return "main";
    }

    @GetMapping("/bye")
    public String bye(Model model){
        model.addAttribute("ime", "ekipa");
        return "bye";
    }
}
