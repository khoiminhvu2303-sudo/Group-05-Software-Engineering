package service;

import dto.request.RegisterReaderDTO;
import dto.response.ReaderResponseDTO;

public class ReaderService {

    public ReaderResponseDTO registerReader(RegisterReaderDTO request) {
        // TODO: Save new reader entity to Reader table
        ReaderResponseDTO response = new ReaderResponseDTO();
        response.setReaderId("RD00000001");
        response.setFullName(request.getFullName());
        response.setEmail(request.getEmail());
        response.setStatus("Active");
        return response;
    }

    public ReaderResponseDTO getReaderById(String readerId) {
        // TODO: Find reader record by readerId
        return new ReaderResponseDTO();
    }
}
