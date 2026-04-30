package com.barbacode.sales;

import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SaleFolioService {

    private final DocumentFolioSequenceRepository sequenceRepository;

    @Transactional
    public String nextSaleFolio(LocalDate businessDate) {
        DocumentFolioSequence sequence = sequenceRepository
                .findByDocumentTypeAndBusinessDate(DocumentType.VTA, businessDate)
                .orElseGet(() -> {
                    DocumentFolioSequence created = new DocumentFolioSequence();
                    created.setDocumentType(DocumentType.VTA);
                    created.setBusinessDate(businessDate);
                    created.setNextValue(1L);
                    return created;
                });

        long currentValue = sequence.getNextValue();
        sequence.setNextValue(currentValue + 1);
        sequenceRepository.save(sequence);

        return "VTA-%s-%04d".formatted(
                businessDate.format(java.time.format.DateTimeFormatter.BASIC_ISO_DATE),
                currentValue
        );
    }
}
