package com.project.coronaProject;


import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.feed.synd.SyndFeedImpl;
import com.sun.syndication.io.FeedException;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.XmlReader;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;


@Controller
public class MainController {

    @GetMapping("/")
    public String main(Model model) {
        model.addAttribute("ime", "ekipa");
        URL feedSource = null;
        try {
            feedSource = new URL("https://www.gov.si/novice/rss?tagID=596");
            SyndFeedInput input = new SyndFeedInput();
            SyndFeed feed = input.build(new XmlReader(feedSource));
            System.out.println(feed);
            model.addAttribute("novice", feed);
        } catch (FeedException | IOException e) {
            e.printStackTrace();
        }

        return "main";
    }

    @GetMapping("/bye")
    public String bye(Model model){
        model.addAttribute("ime", "ekipa");
        return "bye";
    }
}
