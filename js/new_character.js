/*
Copyright (C) 2024 Lance Borden, Sariah Echols

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 3.0
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.

*/

document.addEventListener("alpine:init", () => {
  // Character token image page
  Alpine.data("tokenImagePage", () => ({
    styles() {
      return `
        .profile-pic {
          color: transparent;
          transition: all .3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transition: all .3s ease;
          
          input {
            display: none;
          }
          
          img {
            position: absolute;
            object-fit: cover;
            width: 128px;
            height: 128px;
            border-radius: 128px;
            z-index: 0;
          }
          
          .-label {
            cursor: pointer;
            height: 128px;
            width: 128px;
          }
          
          &:hover {
            .-label {
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: rgba(0,0,0,.8);
              z-index: 10000;
              color: rgb(250, 250, 250);
              transition: background-color .2s ease-in-out;
              border-radius: 128px;
              margin-bottom: 0;
            }
          }
          
          span {
            display: inline-flex;
            padding: .2em;
            height: 2em;
          }
        }
      `;
    },
    page() {
      return `
        <div class="profile-pic">
          <label class="-label" for="file">
            <span class="glyphicon glyphicon-camera"></span>
            <span>Change Image</span>
          </label>
          <input id="file" type="file" @change="loadImage(event)"/>
          <img class="icon" src="" id="token-img" width="128" />
          <img src="./css/res/player_border.png" width="128"/>
        </div> 

        <div>
          <button class="button w3-margin-top" x-on:click="nextPage">
            next
          </button>
        </div>
      `;
    },
  }));

  // basic character info form
  Alpine.data("basicCharInfo", () => ({
    page() {
      return `
        <div class="input-group w3-margin-top">
          <input
            x-model="charName"
            required=""
            type="text"
            name="text"
            autocomplete="off"
            class="input"
          />
          <label class="user-label">Character Name</label>
        </div>

        <!--Race-->
        <div
          x-data="{ races: ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn',
      'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'] }"
          class="input-group w3-margin-top"
        >
          <select
            x-model="charRace"
            x-data="dropdownState"
            class="select"
            name="race"
            id="race"
            x-ref="select"
            x-on:change="checkSelect($refs.select)"
          >
            <option value="" disabled selected>Race</option>
            <template x-for="race in races">
              <option x-bind:value="race" x-text="race"></option>
            </template>
          </select>
          <label class="user-label">Race</label>
        </div>

        <!--Class-->
        <div
          x-data="{ classes: ['Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter',
      'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'] }"
          class="input-group w3-margin-top"
        >
          <select
            x-model="charClass"
            x-data="dropdownState"
            class="select"
            name="dndclass"
            id="dndclass"
            x-ref="select"
            x-on:change="checkSelect($refs.select)"
          >
            <option value="" disabled selected>Class</option>
            <template x-for="dndclass in classes">
              <option x-bind:value="dndclass" x-text="dndclass"></option>
            </template>
          </select>
          <label class="user-label">Class</label>
        </div>

        <!--Level-->
        <div class="input-group w3-margin-top">
          <select
            x-model="charLevel"
            x-data="dropdownState"
            class="select"
            name="level"
            id="level"
            x-ref="select"
            x-on:change="checkSelect($refs.select)"
          >
            <option value="" disabled selected>Level</option>
            <template x-for="i in 20">
              <option x-bind:value="i" x-text="i"></option>
            </template>
          </select>
          <label class="user-label">Level</label>
        </div>
        
        <div>
          <button class="button w3-margin-top" x-on:click="nextPage">
            next
          </button>
        </div>
      `;
    },
  }));

  // character ability scores form
  Alpine.data("charAbilityScores", () => ({
    page() {
      return `
        <!--Ability Scores-->
        <div
          x-data="{ abilities: ['Strength', 'Dexterity', 'Constitution',
      'Intelligence', 'Wisdom', 'Charisma'] }"
        >
          <template x-for="ability in abilities">
            <div class="input-group w3-margin-top">
              <select
                x-bind:x-model="ability"
                x-data="dropdownState"
                class="select"
                x-bind:name="ability"
                x-bind:id="ability"
                x-ref="select"
                x-on:change="checkSelect($refs.select)"
              >
                <option
                  value=""
                  x-text="ability"
                  disabled
                  selected
                ></option>
                <template x-for="i in 18">
                  <option x-bind:value="i + 2" x-text="i + 2"></option>
                </template>
              </select>
              <label class="user-label" x-text="ability"></label>
            </div>
          </template>
        </div>
        
        <div>
          <button class="button w3-margin-top" x-on:click="nextPage">
            next
          </button>
        </div>
      `;
    },
  }));

  // additional character stats
  Alpine.data("charExtraStats", () => ({
    page() {
      return `
        <!--Other-->
        <div class="input-group w3-margin-top">
          <input
            x-model="charAC"
            required=""
            type="text"
            name="text"
            autocomplete="off"
            class="input"
          />
          <label class="user-label">Armor Class</label>
        </div>

        <div class="input-group w3-margin-top">
          <input
            x-model="charHP"
            required=""
            type="text"
            name="text"
            autocomplete="off"
            class="input"
          />
          <label class="user-label">Hit Points</label>
        </div>
        
        <div>
          <button class="button w3-margin-top" x-on:click="nextPage">
            next
          </button>
        </div>
      `;
    },
  }));

  // character weapons forms
  Alpine.data("charWeapons", () => ({
    page() {
      return `
        <!--Weapons-->
        <div
          x-data="{ weapons: ['Club', 'Dagger', 'Greatclub', 'Handaxe', 'Javelin',
      'Light Hammer', 'Mace', 'Quarterstaff', 'Sickle', 'Spear'] }"
          class="input-group w3-margin-top"
        >
          <select
            class="select"
            name="simpleMelee"
            id="simpleMelee"
            multiple
          >
            <option value="" disabled selected>Simple Melee</option>
            <template x-for="weapon in weapons">
              <option x-bind:value="weapon" x-text="weapon"></option>
            </template>
          </select>
        </div>

        <div
          x-data="{ weapons: ['Light Crossbow', 'Dart', 'Shortbow', 'Sling'] }"
          class="input-group w3-margin-top"
        >
          <select
            class="select"
            name="simpleRanged"
            id="simpleRanged"
            multiple
          >
            <option value="" disabled selected>Simple Ranged</option>
            <template x-for="weapon in weapons">
              <option x-bind:value="weapon" x-text="weapon"></option>
            </template>
          </select>
        </div>

        <div
          x-data="{ weapons: ['Blowgun', 'Hand Crossbow', 'Heavy Crossbow', 'Longbow', 'Net'] }"
          class="input-group w3-margin-top"
        >
          <select
            class="select"
            name="martialRanged"
            id="martialRanged"
            multiple
          >
            <option value="" disabled selected>Martial Ranged</option>
            <template x-for="weapon in weapons">
              <option x-bind:value="weapon" x-text="weapon"></option>
            </template>
          </select>
        </div>
        <div
          x-data="{ weapons: ['Battleaxe', 'Flail', 'Glaive', 'Greataxe', 'Greatsword', 'Halberd', 'Lance', 'Longsword', 'Maul', 'Morningstar', 'Pike', 'Rapier', 'Scimitar', 'Shortsword', 'Trident', 'Warpick','Warhammer','Whip'] }"
          class="input-group w3-margin-top"
        >
          <select
            class="select"
            name="martialRanged"
            id="martialMelee"
            multiple
          >
            <option value="" disabled selected>Martial Melee</option>
            <template x-for="weapon in weapons">
              <option x-bind:value="weapon" x-text="weapon"></option>
            </template>
          </select>
        </div>
        
        <div>
          <button class="button w3-margin-top" x-on:click="sendCharacter">
            create character
          </button>
        </div>      
      `;
    },
  }));
});
