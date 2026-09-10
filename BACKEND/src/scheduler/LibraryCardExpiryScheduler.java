package com.library.scheduler;

import com.library.async.EmailSender;
import com.library.entity.Reader;
import com.library.repository.ReaderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class LibraryCardExpiryScheduler {

    private final ReaderRepository readerRepository;
    private final EmailSender emailSender;

    // Runs every day at 08:00 AM
    @Scheduled(cron = "0 0 8 * * ?")
    public void checkCardExpiry() {
        log.info("Starting LibraryCardExpiryScheduler...");
        LocalDate warningDate = LocalDate.now().plusDays(7);
        
        List<Reader> expiringReaders = readerRepository.findByExpiryDate(warningDate);
        for (Reader reader : expiringReaders) {
            emailSender.sendEmailAsync(
                reader.getEmail(),
                "Library Card Expiry Warning",
                "Your library card is set to expire on " + reader.getExpiryDate() + ". Please renew your membership."
            );
        }
    }
}
