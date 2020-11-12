package com.project.coronaProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class CoronaProjectApplication {

	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

	public static void main(String[] args) {

		SpringApplication.run(CoronaProjectApplication.class, args);

	}

	public Brezposelni[] brezposelniPodatki(){
		Brezposelni[] b = new Brezposelni[10];
		b[0] = new Brezposelni("julij", 6214, 2970, 15039, 6160, 3735, 1928,
		12497, 2696, 6792, 3643, 4981, 21834);
		return b;
	}

}
