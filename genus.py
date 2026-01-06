import math

LEVEL_XP_REQUIREMENTS = {
    1: 1000,
    2: 3000,
    3: 6000,
    4: 10000,
    5: 20000,
    6: 40000,
    7: 80000,
    8: 140000,
    9: 200000
}

CRYSTAL_LOCK_COSTS = [
    5,    # 1st lock
    5,    # 2nd lock
    20,   # 3rd lock
    45,   # 4th lock
    95,   # 5th lock
    95,   # 6th lock
    95,   # 7th lock
    95    # 8th lock
]

KINAH_LOCK_COSTS = [
    1000,   # 1st lock
    1000,   # 2nd lock
    4000,   # 3rd lock
    9000,   # 4th lock
    19000,  # 5th lock
    19000,  # 6th lock
    19000,  # 7th lock
    19000   # 8th lock
]

BASE_CRYSTALS_PER_SLOT = 5
BASE_KINAH_PER_SLOT = 1000
XP_PER_SLOT = 100
MAX_SLOTS = 9

genus_level = int(input("Enter current genus level (1–9): "))
current_xp = int(input("Enter current experience in this level: "))
locked_slots = int(input("Enter number of locked slots: "))

if genus_level > 9:
    print("invalid genus level.")
    exit()

usable_slots = min(genus_level, MAX_SLOTS)

if locked_slots < 0 or locked_slots >= usable_slots:
    print("invalid number of locked slots.")
    exit()

xp_needed = LEVEL_XP_REQUIREMENTS[genus_level] - current_xp
xp_per_roll = usable_slots * XP_PER_SLOT
rolls_needed = math.ceil(xp_needed / xp_per_roll)

# base costs
base_crystals = usable_slots * BASE_CRYSTALS_PER_SLOT
base_kinah = usable_slots * BASE_KINAH_PER_SLOT

# locking penalties
extra_crystals = sum(CRYSTAL_LOCK_COSTS[:locked_slots])
extra_kinah = sum(KINAH_LOCK_COSTS[:locked_slots])
crystals_per_roll = base_crystals + extra_crystals
kinah_per_roll = base_kinah + extra_kinah

# totals
total_crystals = crystals_per_roll * rolls_needed
total_kinah = kinah_per_roll * rolls_needed

print(f"\n===== GENUS LEVEL-UP COST SUMMARY =====")
print(f"Current Level: {genus_level}")
print(f"XP Needed: {xp_needed}")
print(f"Usable Slots: {usable_slots}")
print(f"Locked Slots: {locked_slots}")
print(f"XP per Roll: {xp_per_roll}")
print(f"Rolls Needed: {rolls_needed}")
print("--------------------------------------")
print(f"Crystals per Roll: {crystals_per_roll}")
print(f"Kinah per Roll: {kinah_per_roll}")
print("--------------------------------------")
print(f"TOTAL Crystals Needed: {total_crystals}")
print(f"TOTAL Kinah Needed: {total_kinah}")
print("======================================")

