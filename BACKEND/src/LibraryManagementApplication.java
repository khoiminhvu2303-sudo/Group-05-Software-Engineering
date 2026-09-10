import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages = {
    "async", "config", "constant", "controller", 
    "dto", "enity", "event", "exception", 
    "filter", "interceptor", "repository", 
    "scheduler", "security", "service", "util", "validation"
})
@EnableScheduling
@EnableAsync
@EnableJpaAuditing
public class LibraryManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementApplication.class, args);
    }

}
