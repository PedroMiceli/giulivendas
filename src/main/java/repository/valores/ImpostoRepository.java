package repository.valores;

import models.valores.Imposto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ImpostoRepository extends JpaRepository<Imposto, UUID> {
}
