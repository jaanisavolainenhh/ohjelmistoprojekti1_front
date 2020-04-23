package salen.palikat.ohjelmistoprojekti;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import salen.palikat.ohjelmistoprojekti.domain.Kysymys;
import salen.palikat.ohjelmistoprojekti.domain.KysymysRepository;
import salen.palikat.ohjelmistoprojekti.domain.Vaihtoehto;
import salen.palikat.ohjelmistoprojekti.domain.VaihtoehtoRepository;
import salen.palikat.ohjelmistoprojekti.domain.Vastaus;
import salen.palikat.ohjelmistoprojekti.domain.VastausRepository;

@SpringBootApplication
public class OhjelmistoprojektiApplication {

	private static final Logger log = LoggerFactory.getLogger(OhjelmistoprojektiApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(OhjelmistoprojektiApplication.class, args);
	}

	@Bean // tähän voi tunkea loputtomasti argumentteja näköjään?
	public CommandLineRunner bookstoreDemo(KysymysRepository kysymysRepo, VastausRepository vastausRepo, VaihtoehtoRepository vaihtoehtoRepo) {
		
		return (args) -> {
//			
			//Kysymys kysymys = new Kysymys("Moi");
			Vaihtoehto vaihtoehto1 =new Vaihtoehto ("Vaihtoehto 1");
			Vaihtoehto vaihtoehto2 =new Vaihtoehto ("Vaihtoehto 2");
			Vaihtoehto vaihtoehto3 =new Vaihtoehto ("Vaihtoehto 3");
			
			List<Vaihtoehto> lista = new ArrayList<Vaihtoehto>();
			lista.add(vaihtoehto1);
			lista.add(vaihtoehto2);
			lista.add(vaihtoehto3);
			
			Kysymys kysymys = new Kysymys("Tämä on kysymys 1, mistä väristä pidät?", lista);
			log.info("tämä tulee");
			vaihtoehto1.setKysymys(kysymys);
			vaihtoehto2.setKysymys(kysymys);
			vaihtoehto3.setKysymys(kysymys);
			log.info("tämä tulee2");
			kysymysRepo.save(kysymys);
			log.info("tämä tulee3");
			vaihtoehtoRepo.save(vaihtoehto1);
			vaihtoehtoRepo.save(vaihtoehto2);
			vaihtoehtoRepo.save(vaihtoehto3);
			log.info("tämä tulee4");
			
			
			
			Vastaus vastaus1 = new Vastaus("Tämä on vastaus, punainen.", kysymys);
			Vastaus vastaus2 = new Vastaus("Tämä on vastaus, sininen.", kysymys);

			vastausRepo.save(vastaus1);
			vastausRepo.save(vastaus2);

//			lainatyypit.save(new Lainatyyppi("Erotiikka"));
//			lainatyypit.save(new Lainatyyppi("Politiikka"));
//			lainatyypit.save(new Lainatyyppi("Eroottinen politiikka"));
//			asiakkaat.save(new Asiakas("Asiakas 1"));
//			asiakkaat.save(new Asiakas("Asiakas 2"));
//			asiakkaat.save(new Asiakas("Asiakas 3"));
//			
//			//log.info("Toimii ennen addaamista.");
//			lainat.save(new Kysymys(asiakkaat.findByNimi("Asiakas 1"), 100,lainatyypit.findByName("Erotiikka").get(0)));
//			lainat.save(new Kysymys(asiakkaat.findByNimi("Asiakas 2"),200,lainatyypit.findByName("Politiikka").get(0)));
//			lainat.save(new Kysymys(asiakkaat.findByNimi("Asiakas 3"), 300, lainatyypit.findByName("Eroottinen politiikka").get(0)));
//			//TODO Thymeleafiin fixaukset
//			User user1 = new User("user", "$2a$06$3jYRJrg0ghaaypjZ/.g4SethoeA51ph3UD4kZi9oPkeMTpjKU5uo6", "USER", "email@email.com");
//			User user2 = new User("admin", "$2a$10$0MMwY.IQqpsVc1jC8u7IJ.2rT8b0Cd3b3sfIBGV2zfgnPGtT4r0.C", "ADMIN", "posti@posti.com");
//			userit.save(user1);
//			userit.save(user2);
//
//			for (Kysymys book : lainat.findAll()) {
//				log.info(book.toString());
//			}
//
//			for (Lainatyyppi category : lainatyypit.findAll()) {
//				log.info(category.toString());
//			}
//			
//			for (User user: userit.findAll()) {
//				log.info(user.toString());
//			}

		};
	}
}
