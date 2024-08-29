package com.example.DietPlanner.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.DietPlanner.model.Diet;
import com.example.DietPlanner.service.DietService;

@RestController
@RequestMapping("/DietPlanner/api/diets")
public class DietController {

    @Autowired
    private DietService dietService;

    @PostMapping
    public ResponseEntity<Diet> createDiet(@RequestBody Diet diet) {
        Diet createdDiet = dietService.createDiet(diet);
        return new ResponseEntity<>(createdDiet, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Diet> getDietByUserId(@PathVariable Long userId) {
        Diet diet = dietService.getDietByUserId(userId);
        return new ResponseEntity<>(diet, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Diet> updateDiet(@PathVariable Long userId, @RequestBody Diet dietDetails) {
        Diet updatedDiet = dietService.updateDiet(userId, dietDetails);
        return new ResponseEntity<>(updatedDiet, HttpStatus.OK);
    }
    
    @GetMapping("/{userId}/meals")
    public ResponseEntity<Map<String, Integer>> getCaloriesByMeals(@PathVariable Long userId) {
        Map<String, Integer> mealCalories = dietService.getCaloriesByMeals(userId);
        return new ResponseEntity<>(mealCalories, HttpStatus.OK);
    }
}

