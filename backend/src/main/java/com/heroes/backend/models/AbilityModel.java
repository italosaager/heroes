package com.heroes.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Entity
@Table(schema = "public", name = "tb_ability")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AbilityModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id_ability;
    @Column(name = "name_ability")
    private String nameAbility;
}
