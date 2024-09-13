package com.heroes.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Entity
@Table(schema = "public", name = "tb_hero")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HeroModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id_hero;
    @Column(name = "name_hero")
    private String nameHero;
    @Column(name = "fk_ability")
    private BigInteger fkAbility;
}
