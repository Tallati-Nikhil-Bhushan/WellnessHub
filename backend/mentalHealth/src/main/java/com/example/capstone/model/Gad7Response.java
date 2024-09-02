package com.example.capstone.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "gad7_responses")
public class Gad7Response {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "user_id")
        private Long userId;

        private int question1;
        private int question2;
        private int question3;
        private int question4;
        private int question5;
        private int question6;
        private int question7;
}
