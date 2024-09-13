package com.heroes.backend.repositories;

import com.heroes.backend.models.HeroModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface HeroRepository extends JpaRepository<HeroModel, BigInteger> {
    boolean existsByNameHero(String nameHero);
    boolean existsByFkAbility(BigInteger fkAbility);
}
