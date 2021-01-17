import armor_stand_class
import structure_reader
import animation_class
from tkinter import StringVar, Button, Label, Entry, Tk
from tkinter import filedialog
import manifest
from shutil import copyfile
import os
from zipfile import ZipFile
import glob


def generate_pack(struct_name, pack_name):
    manifest.export(pack_name)
    struct2make = structure_reader.process_structure(struct_name)
    armorstand = armor_stand_class.armorstand()
    animation = animation_class.animations()
    [xlen, ylen, zlen] = struct2make.get_size()
    for y in range(ylen):
        armorstand.make_layer(y)
        animation.insert_layer(y)
        for x in range(xlen):
            for z in range(zlen):

                block = struct2make.get_block(x, y, z)
                rot = None
                top = False
                variant="Default"
                if "wall_block_type" in block["states"].keys():
                    variant = ["wall_block_type",block["states"]["wall_block_type"]]
                if "wood_type" in block["states"].keys():
                    variant = ["wood_type",block["states"]["wood_type"]]
                    if block["name"] == "minecraft:wood":
                        keys = block["states"]["wood_type"]
                        if bool(block["states"]["stripped_bit"]):
                            keys+="_stripped"
                        variant = ["wood",keys]
                if "old_log_type" in block["states"].keys():
                    variant = ["old_log_type",block["states"]["old_log_type"]]
                if "new_log_type" in block["states"].keys():
                    variant = ["new_log_type",block["states"]["new_log_type"]]
                if "stone_type" in block["states"].keys():
                    variant = ["stone_type",block["states"]["stone_type"]]
                if "prismarine_block_type" in block["states"].keys():
                    variant = ["prismarine_block_type",block["states"]["prismarine_block_type"]]
                if "stone_brick_type" in block["states"].keys():
                    variant = ["stone_brick_type",block["states"]["stone_brick_type"]]
                if "color" in block["states"].keys():
                    variant = ["color",block["states"]["color"]]
                if "sand_stone_type" in block["states"].keys():
                    variant = ["sand_stone_type",block["states"]["sand_stone_type"]]
                if "stone_slab_type" in block["states"].keys():
                    variant = ["stone_slab_type",block["states"]["stone_slab_type"]]
                if "stone_slab_type_2" in block["states"].keys():
                    variant = ["stone_slab_type_2",block["states"]["stone_slab_type_2"]]
                if "stone_slab_type_3" in block["states"].keys():
                    variant = ["stone_slab_type_3",block["states"]["stone_slab_type_3"]]
                if "stone_slab_type_4" in block["states"].keys():
                    variant = ["stone_slab_type_4",block["states"]["stone_slab_type_4"]]
                if "facing_direction" in block["states"].keys():
                    rot = block["states"]["facing_direction"]

                if "direction" in block["states"].keys():
                    rot = block["states"]["direction"]
                if "top_slot_bit" in block["states"].keys():
                    top = bool(block["states"]["top_slot_bit"])
                if "weirdo_direction" in block["states"].keys():
                    rot = int(block["states"]["weirdo_direction"])
                if "upside_down_bit" in block["states"].keys():
                    top = bool(block["states"]["upside_down_bit"])


                armorstand.make_block(x, y, z, block["name"].replace(
                    "minecraft:", ""), rot = rot, top = top,variant = variant)


    armorstand.export(pack_name)
    animation.export(pack_name)
    copyfile("lookups/pack_icon.png", "{}/pack_icon.png".format(pack_name))
    os.makedirs(os.path.dirname(
        "{}/entity/armor_stand.entity.json".format(pack_name)), exist_ok=True)
    copyfile("lookups/armor_stand.entity.json",
             "{}/entity/armor_stand.entity.json".format(pack_name))

    # Adds to zip file a modified armor stand geometry to enlarge the render area of the entity
    larger_render = "lookups/armor_stand.larger_render.geo.json"
    larger_render_path = "{}/models/entity/{}".format(pack_name, "armor_stand.larger_render.geo.json")
    copyfile(larger_render, larger_render_path)

    rc = "lookups/armor_stand.ghost_blocks.render_controllers.json"
    rcpath = "{}/render_controllers/{}".format(pack_name, rc)
    os.makedirs(os.path.dirname(rcpath))
    
    copyfile(rc, rcpath)
    biggeo = "lookups/armor_stand.larger_render.geo.json"
    biggeopath = "{}/models/entity/{}".format(pack_name,"armor_stand.larger_render.geo.json")
    copyfile(biggeo, biggeopath)
    file_paths = []
    for directory,_,_ in os.walk(pack_name):
        file_paths.extend(glob.glob(os.path.join(directory, "*.*")))
    with ZipFile("{}.mcpack".format(pack_name), 'x') as zip: 
        # writing each file one by one 

        for file in file_paths:
            print(file)
            zip.write(file)


def runFromGui():
    FileGUI
    generate_pack(FileGUI.get(), packName.get())


def browseStruct():
    FileGUI.set(filedialog.askopenfilename(filetypes=(
        ("Structure File", "*.mcstructure *.MCSTRUCTURE"), )))


root = Tk()
root.title("Bedrock Litematica Maker")


FileGUI = StringVar()
packName = StringVar()
file_entry = Entry(root, textvariable=FileGUI)
packName_entry = Entry(root, textvariable=packName)
file_lb = Label(root, text="Structure file")
packName_lb = Label(root, text="Pack Name")
packButton = Button(root, text="Browse", command=browseStruct)

saveButton = Button(root, text="Make Pack", command=runFromGui)
r = 0
file_lb.grid(row=r, column=0)
file_entry.grid(row=r, column=1)
packButton.grid(row=r, column=2)
r += 1
packName_lb.grid(row=r, column=0)
packName_entry.grid(row=r, column=1)
r += 1
saveButton.grid(row=r, column=2)


root.mainloop()
