package com.barbacode.sales;

import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentFolioSequenceRepository extends JpaRepository<DocumentFolioSequence, Long> {

    Optional<DocumentFolioSequence> findByDocumentTypeAndBusinessDate(DocumentType documentType, LocalDate businessDate);
}
