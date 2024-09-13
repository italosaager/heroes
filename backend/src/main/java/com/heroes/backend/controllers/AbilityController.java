package com.heroes.backend.controllers;

import com.heroes.backend.models.AbilityModel;
import com.heroes.backend.models.HeroModel;
import com.heroes.backend.services.AbilityService;
import com.heroes.backend.services.HeroService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/ability")
public class AbilityController {

    @Autowired
    private AbilityService abilityService;

    @Autowired
    private HeroService heroService;

    @GetMapping
    public ResponseEntity<List<AbilityModel>> getAbilities(){
        List<AbilityModel> list = abilityService.listAbility();
        if(list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> insertAbility(@RequestBody AbilityModel abilityModel) {
        try {
            AbilityModel insertAbility = abilityService.insertAbility(abilityModel);
            return new ResponseEntity<>(insertAbility, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("Ability already exists")) {
                return new ResponseEntity<>("Ability already exists", HttpStatus.CONFLICT);
            } else {
                return new ResponseEntity<>("Error saving ability. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Unexpected error occurred. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAbility(@PathVariable BigInteger id) {
        try {
            boolean hasHeroWithAbility = heroService.existsByFkAbility(id);

            if (hasHeroWithAbility) {
                return new ResponseEntity<>("Cannot delete ability. There are heroes associated with this ability.", HttpStatus.BAD_REQUEST);
            }

            abilityService.deleteAbility(id);
            return new ResponseEntity<>("Ability deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("Ability not found", HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<AbilityModel> updateAbility(@PathVariable BigInteger id, @RequestBody AbilityModel abilityModel) {
        try {
            AbilityModel updatedAbility = abilityService.updateAbility(id, abilityModel);
            return new ResponseEntity<>(updatedAbility, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{idAbility}")
    public ResponseEntity<?> getHeroById(@PathVariable BigInteger idAbility) {
        try {
            AbilityModel ability = abilityService.findAbilityById(idAbility);
            return new ResponseEntity<>(ability, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("Ability not found!", HttpStatus.NOT_FOUND);
        }
    }

}
