package com.heroes.backend.services;

import com.heroes.backend.DTOs.HeroAbilityDTO;
import com.heroes.backend.models.HeroModel;
import com.heroes.backend.repositories.HeroRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class HeroService {

    @Autowired
    private HeroRepository heroRepository;

    @Autowired
    private EntityManager entityManager;

    public List<HeroModel> listHeroes() {
        List<HeroModel> list = heroRepository.findAll();
        return list;
    }

    public List<HeroAbilityDTO> listHeroAbility() {
        String sql = """
                SELECT id_hero, name_hero, id_ability, name_ability
                FROM tb_hero th
                INNER JOIN tb_ability ta ON ta.id_ability = th.fk_ability
                ORDER BY name_hero
                """;
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> list = query.getResultList();

        List<HeroAbilityDTO> heroAbilities = new ArrayList<>();
        for (Object[] row : list) {
            Long idHero = (Long) row[0];
            String heroName = (String) row[1];
            Long idAbility = (Long) row[2];
            String abilityName = (String) row[3];

            heroAbilities.add(new HeroAbilityDTO(idHero, heroName, idAbility, abilityName));
        }

        return heroAbilities;
    }

    public HeroModel insertHero(HeroModel heroModel) {
        if (heroRepository.existsByNameHero(heroModel.getNameHero())) {
            throw new DataIntegrityViolationException("Hero already exists");
        }
        return heroRepository.save(heroModel);
    }

    public void deleteHero(BigInteger id) {
        if (!heroRepository.existsById(id)) {
            throw new EntityNotFoundException("Hero not found");
        }
        heroRepository.deleteById(id);
    }

    public HeroModel updateHero(BigInteger id, HeroModel heroModel) {
        HeroModel existingHero = heroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hero not found"));

        existingHero.setNameHero(heroModel.getNameHero());

        if (heroModel.getFkAbility() != null) {
            existingHero.setFkAbility(heroModel.getFkAbility());
        }

        return heroRepository.save(existingHero);
    }

    public HeroModel findHeroById(BigInteger idHero) {
        return heroRepository.findById(idHero)
                .orElseThrow(() -> new EntityNotFoundException("Hero not found!"));
    }

    public boolean existsByFkAbility(BigInteger abilityId) {
        return heroRepository.existsByFkAbility(abilityId);
    }
}

