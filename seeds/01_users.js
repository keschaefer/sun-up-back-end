exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
        "name_full": "Kate Schaefer",
        "password": "test123",
        "email": "keschaefer@gmail.com",
        "org_name": "Kate Inc.",
        "current_year_tax": 200000,
        "current_year_energy_cost": 40000,
        "roof_square_footage": 2500,
        "projected_energy_annual_kW": 36,
        "match_program": true,
        "match_alerts": false,
        },
        {
        "name_full": "Phil Hengemuhle",
        "password": "test123",
        "email": "phil@gmail.com",
        "org_name": "Phil and Co.",
        "current_year_tax": 500000,
        "current_year_energy_cost": 100000,
        "roof_square_footage": 1000,
        "projected_energy_annual_kW": 20,
        "match_program": true,
        "match_alerts": true,
        },
        {
        "name_full": "Beef Mitch",
        "password": "test123",
        "email": "beef@gmail.com",
        "org_name": "Bethany & Family",
        "current_year_tax": 100000,
        "current_year_energy_cost": 1500,
        "roof_square_footage": 3500,
        "projected_energy_annual_kW": 45,
        "match_program": true,
        "match_alerts": false,
        },
        {
        "name_full": "Dane Parke",
        "password": "test123",
        "email": "dane@gmail.com",
        "org_name": "Dane & Friends",
        "current_year_tax": 1000000,
        "current_year_energy_cost": 100000,
        "roof_square_footage": 5000,
        "projected_energy_annual_kW": 70,
        "match_program": true,
        "match_alerts": false,
        }
      ]);
    });
};
