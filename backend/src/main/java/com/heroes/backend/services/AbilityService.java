package com.heroes.backend.services;

import com.heroes.backend.models.AbilityModel;

import com.heroes.backend.models.HeroModel;
import com.heroes.backend.repositories.AbilityRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public class AbilityService {

    @Autowired
    private AbilityRepository abilityRepository;

    public List<AbilityModel> listAbility(){
        List<AbilityModel> list = abilityRepository.findAllByOrderByNameAbilityAsc();
        return list;
    }

    public AbilityModel insertAbility(AbilityModel abilityModel) {
        if(abilityRepository.existsByNameAbility(abilityModel.getNameAbility())) {
            throw new DataIntegrityViolationException("Ability already exists");
        }
        return  abilityRepository.save(abilityModel);
    }

    public void deleteAbility(BigInteger id) {
        if (!abilityRepository.existsById(id)) {
            throw new EntityNotFoundException("Ability not found");
        }
        abilityRepository.deleteById(id);
    }

    public AbilityModel updateAbility(BigInteger id, AbilityModel abilityModel) {
        AbilityModel existingAbility = abilityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ability not found"));

        existingAbility.setNameAbility(abilityModel.getNameAbility());

        return abilityRepository.save(existingAbility);
    }

    public AbilityModel findAbilityById(BigInteger idAbility) {
        return abilityRepository.findById(idAbility)
                .orElseThrow(() -> new EntityNotFoundException("Ability not found!"));
    }
}
