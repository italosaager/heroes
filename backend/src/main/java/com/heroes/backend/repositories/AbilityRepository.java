package com.heroes.backend.repositories;

import com.heroes.backend.models.AbilityModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public interface AbilityRepository extends JpaRepository<AbilityModel, BigInteger> {

    boolean existsByNameAbility(String nameAbility);
    List<AbilityModel> findAllByOrderByNameAbilityAsc();
}
