package com.heroes.backend.controllers;

import com.heroes.backend.DTOs.HeroAbilityDTO;
import com.heroes.backend.models.AbilityModel;
import com.heroes.backend.models.HeroModel;
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
@RequestMapping("/hero")
public class HeroController {

    @Autowired
    private HeroService heroService;

    @GetMapping
    public ResponseEntity<List<HeroModel>> getHero() {
        List<HeroModel> list = heroService.listHeroes();
        if(list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/ability")
    public ResponseEntity<List<HeroAbilityDTO>> getHeroAbility () {
        List<HeroAbilityDTO> list = heroService.listHeroAbility();
        if(list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> insertHero(@RequestBody HeroModel heroModel) {
        try {
            HeroModel insertHero = heroService.insertHero(heroModel);
            return new ResponseEntity<>(insertHero, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("Hero already exists")) {
                return new ResponseEntity<>("Hero already exists", HttpStatus.CONFLICT);
            } else {
                return new ResponseEntity<>("Error saving hero. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Unexpected error occurred. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteHero(@PathVariable BigInteger id) {
        try {
            heroService.deleteHero(id);
            return new ResponseEntity<>("Hero deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("Hero not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HeroModel> updateHero(@PathVariable BigInteger id, @RequestBody HeroModel heroModel) {
        try {
            HeroModel updatedHero = heroService.updateHero(id, heroModel);
            return new ResponseEntity<>(updatedHero, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{idHero}")
    public ResponseEntity<?> getHeroById(@PathVariable BigInteger idHero) {
        try {
            HeroModel hero = heroService.findHeroById(idHero);
            return new ResponseEntity<>(hero, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("Hero not found!", HttpStatus.NOT_FOUND);
        }
    }

}
