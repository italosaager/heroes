package com.heroes.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HeroAbilityDTO {
    private Long id_hero;
    private String name_hero;
    private Long id_ability;
    private String name_ability;
}
