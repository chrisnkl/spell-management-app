import { useEffect, useState } from "react";
import { api } from "../../api";
import type { Item } from "../models/Item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Chip,
  Button,
  toast,
  SuccessIcon,
  Drawer,
  DrawerTrigger,
  Form,
  Label,
  Select,
  ListBox,
} from "@heroui/react";
import {
  Flame,
  Snowflake,
  Zap,
  Mountain,
  HelpCircle,
  ChevronUp,
  Trash,
  RefreshCw,
  FileExclamationPointIcon,
  Plus,
} from "lucide-react";

function AddItemDrawer() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    element: "",
    power: 0,
    rarity: "",
    description: "",
    status: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/items", form);
      if (response.status === 200) {
        toast("Item created successfully.", {
          actionProps: {
            children: "Dismiss",
            onPress: () => toast.clear(),
            variant: "tertiary",
          },
          description: "New item " + form.name + " has been created.",
          indicator: <SuccessIcon />,
          variant: "success",
        });
        setForm({
          name: "",
          type: "",
          element: "",
          power: 0,
          rarity: "",
          description: "",
          status: "",
        });
      }
    } catch (error) {
      toast("Failed to create item.", {
        actionProps: {
          children: "Dismiss",
          onPress: () => toast.clear(),
          variant: "tertiary",
        },
        description: error.response?.data?.message || "An error occurred.",
        indicator: <FileExclamationPointIcon />,
        variant: "danger",
      });
    }
  };

  return (
    <Drawer key="right">
      <DrawerTrigger>
        <Button variant="primary">
          <Plus size={16} /> Add Item
        </Button>
      </DrawerTrigger>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>Add New Item</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <Form
                className="mt-4 flex flex-col gap-4"
                id="add-item"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    placeholder="Item Name"
                    className="max-w-md w-full rounded-sm border border-gray-400 hover:border-gray-800 transition-colors duration-300"
                    onChange={(e) =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        name: e.target.value,
                      }))
                    }
                    value={form["name"]}
                  />
                </div>
                <div className="flex flex-col">
                  <Select
                    id="item-type"
                    placeholder="Select one"
                    selectedKey={form.type}
                    onSelectionChange={(key) =>
                      setForm((prev) => ({
                        ...prev,
                        type: key as string,
                        status: "",
                      }))
                    }
                  >
                    <Label>Item Type</Label>
                    <Select.Trigger className="rounded-sm border border-gray-400 hover:border-gray-800 transition-colors duration-300">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item
                          id="Spell"
                          textValue="Spell"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Spell
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="Potion"
                          textValue="Potion"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Potion
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Select
                    id="item-element"
                    placeholder="Select one"
                    selectedKey={form.element}
                    onSelectionChange={(key) =>
                      setForm((prev) => ({
                        ...prev,
                        element: key as string,
                      }))
                    }
                  >
                    <Label>Item Element</Label>
                    <Select.Trigger className="rounded-sm border border-gray-400 hover:border-gray-800 transition-colors duration-300">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item
                          id="Fire"
                          textValue="Fire"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Fire
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="Ice"
                          textValue="Ice"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Ice
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="Lightning"
                          textValue="Lightning"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Lightning
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="Earth"
                          textValue="Earth"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Earth
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="item-power">Item Power</Label>
                  <Input
                    type="number"
                    id="item-power"
                    min={0}
                    max={100}
                    placeholder="Item Power"
                    className="max-w-md w-full rounded-sm border border-gray-400 hover:border-gray-800 transition-colors duration-300"
                    onChange={(e) =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        power: Number(e.target.value),
                      }))
                    }
                    value={Number(form.power) || 0}
                  />
                </div>
                <div className="flex flex-col">
                  <Select
                    id="item-rarity"
                    placeholder="Select one"
                    selectedKey={form.rarity}
                    onSelectionChange={(key) =>
                      setForm((prev) => ({
                        ...prev,
                        rarity: key as string,
                      }))
                    }
                  >
                    <Label>Item Rarity</Label>
                    <Select.Trigger className="rounded-sm border border-gray-400 hover:border-gray-800 transition-colors duration-300">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item
                          id="Common"
                          textValue="Common"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Common
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="Rare"
                          textValue="Rare"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Rare
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="Epic"
                          textValue="Epic"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Epic
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="Legendary"
                          textValue="Legendary"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Legendary
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="Wow"
                          textValue="Wow"
                          className="hover:text-blue-bell transition-colors duration-300"
                        >
                          Wow
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="item-description">Item Description</Label>
                  <Input
                    id="item-description"
                    placeholder="Item Description"
                    className="max-w-md w-full rounded-sm border border-gray-400 hover:border-gray-800 transition-colors duration-300"
                    onChange={(e) =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        description: e.target.value,
                      }))
                    }
                    value={form.description}
                  />
                </div>
                <div className="flex flex-col">
                  <Select
                    key={form.type}
                    id="item-status"
                    placeholder="Select one"
                    selectedKey={form.status}
                    onSelectionChange={(key) =>
                      setForm((p) => ({
                        ...p,
                        status: key as string,
                      }))
                    }
                  >
                    <Label>Item Status</Label>
                    <Select.Trigger className="rounded-sm border border-gray-400 hover:border-gray-800 transition-colors duration-300">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {form["type"] === "Spell" ? (
                          <>
                            <ListBox.Item
                              id="Unlearned"
                              textValue="Unlearned"
                              className="hover:text-blue-bell transition-colors duration-300"
                            >
                              Unlearned
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item
                              id="Learned"
                              textValue="Learned"
                              className="hover:text-blue-bell transition-colors duration-300"
                            >
                              Learned
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </>
                        ) : form["type"] === "Potion" ? (
                          <>
                            <ListBox.Item
                              id="Unbrewed"
                              textValue="Unbrewed"
                              className="hover:text-blue-bell transition-colors duration-300"
                            >
                              Unbrewed
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item
                              id="Brewed"
                              textValue="Brewed"
                              className="hover:text-blue-bell transition-colors duration-300"
                            >
                              Brewed
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </>
                        ) : (
                          <></>
                        )}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </Form>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button variant="primary" type="submit" form="add-item">
                Create
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export default function LandingPage() {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const response = await api.get("/items");
    setItems(response.data.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const getElementIcon = (element: string) => {
    const size = 18;
    switch (element.toLowerCase()) {
      case "fire":
        return <Flame className="text-orange-500" size={size} />;
      case "ice":
        return <Snowflake className="text-blue-400" size={size} />;
      case "lightning":
        return <Zap className="text-yellow-400" size={size} />;
      case "earth":
        return <Mountain className="text-green-700" size={size} />;
      default:
        return <HelpCircle className="text-gray-400" size={size} />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "warning";
      case "Epic":
        return "secondary";
      case "Rare":
        return "primary";
      case "Wow":
        return "success";
      default:
        return "default";
    }
  };

  const handlePowerUp = async (item: Item) => {
    console.log("Powering up item with id: " + item.name);

    try {
      const newPower = item.power + 5 > 100 ? 100 : item.power + 5;
      const response = await api.put(`/items/${item.name}`, {
        power: newPower,
      });
      if (item.power >= 100) {
        toast("Failed to power up item.", {
          actionProps: {
            children: "Dismiss",
            onPress: () => toast.clear(),
            variant: "tertiary",
          },
          description: "Item is already at maximum power level.",
          indicator: <FileExclamationPointIcon />,
          variant: "danger",
        });
        return;
      }
      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.map((i) => (i.name === item.name ? response.data.data : i)),
        );
        toast("Item powered up successfully.", {
          actionProps: {
            children: "Dismiss",
            onPress: () => toast.clear(),
            variant: "tertiary",
          },
          description:
            "The specified item with name " +
            item.name +
            " has been powered up.",
          indicator: <SuccessIcon />,
          variant: "success",
        });
      } else {
        toast("Failed to power up item.", {
          actionProps: {
            children: "Dismiss",
            onPress: () => toast.clear(),
            variant: "tertiary",
          },
          description: response.data.message,
          indicator: <FileExclamationPointIcon />,
          variant: "danger",
        });
      }
    } catch (error) {
      toast("Failed to power up item.", {
        actionProps: {
          children: "Dismiss",
          onPress: () => toast.clear(),
          variant: "tertiary",
        },
        description: error.response.data.message,
        indicator: <FileExclamationPointIcon />,
        variant: "danger",
      });
    }
  };

  const handleChangeStatus = async (item: Item) => {
    let status;

    if (item.type === "Spell") {
      status = item.status === "Learned" ? "Unlearned" : "Learned";
    } else if (item.type === "Potion") {
      status = item.status === "Brewed" ? "Unbrewed" : "Brewed";
    }

    try {
      const response = await api.put(`/items/${item.name}`, {
        status: status,
      });
      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.map((i) => (i.name === item.name ? response.data.data : i)),
        );
        toast("Item status changed successfully.", {
          actionProps: {
            children: "Dismiss",
            onPress: () => toast.clear(),
            variant: "tertiary",
          },
          description:
            "The specified item with name " +
            item.name +
            " has had its status changed.",
          indicator: <SuccessIcon />,
          variant: "success",
        });
      } else {
        toast("Failed to change the status of the item.", {
          actionProps: {
            children: "Dismiss",
            onPress: () => toast.clear(),
            variant: "tertiary",
          },
          description: response.data.message,
          indicator: <FileExclamationPointIcon />,
          variant: "danger",
        });
      }
    } catch (error) {
      toast("Failed to change the status of the item.", {
        actionProps: {
          children: "Dismiss",
          onPress: () => toast.clear(),
          variant: "tertiary",
        },
        description: error.response.data.message,
        indicator: <FileExclamationPointIcon />,
        variant: "danger",
      });
    }
  };

  const handleDelete = async (item: Item) => {
    console.log("Deleting item with id: " + item.name);
    const response = await api.delete(`/items/${item.name}`);
    if (response.status === 200) {
      setItems((prevItems) => prevItems.filter((i) => i.name !== item.name));
      toast("Item deleted successfully.", {
        actionProps: {
          children: "Dismiss",
          onPress: () => toast.clear(),
          variant: "tertiary",
        },
        description:
          "The specified item with name " + item.name + " has been deleted.",
        indicator: <SuccessIcon />,
        variant: "success",
      });
    } else {
      toast("Failed to delete item.", {
        actionProps: {
          children: "Dismiss",
          onPress: () => toast.clear(),
          variant: "tertiary",
        },
        description: response.data.message,
        indicator: <FileExclamationPointIcon />,
        variant: "danger",
      });
    }
  };

  return (
    <div className="mt-8 flex flex-col justify-center items-center px-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search an item..."
          className="max-w-md w-full rounded-sm border border-gray-400 hover:border-gray-800 transition-colors duration-300"
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button
          variant="outline"
          onClick={() => fetchItems()}
          className="border border-gray-400 hover:border-gray-800 transition-colors duration-300"
        >
          <RefreshCw size={16} /> Refresh Data
        </Button>
        <AddItemDrawer />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase()),
          )
          .map((item) => (
            <Card
              key={item.name}
              className="hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 shadow-md border border-gray-300 dark:border-gray-800"
            >
              <CardHeader className="flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50 py-3">
                <CardTitle className="text-deep-blue text-xl font-bold tracking-tight">
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 p-2">
                <CardDescription className="text-sm italic text-cerulean dark:text-gray-400">
                  {item.description}
                </CardDescription>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    {getElementIcon(item.element)}
                    <span className="text-sm font-semibold capitalize bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                      {item.element}
                    </span>
                  </div>
                  <Chip
                    size="sm"
                    color={getRarityColor(item.rarity)}
                    variant="secondary"
                    className="font-bold"
                  >
                    {item.rarity}
                  </Chip>
                </div>

                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Power Level</span>
                    <span>{item.power}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cerulean transition-all duration-500 ease-out"
                      style={{ width: `${item.power}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-50 dark:border-gray-800 mt-2">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">
                    Status
                  </span>
                  <span
                    className={`text-xs font-bold ${item.status === "Learned" || item.status === "Brewed" ? "text-green-500" : "text-gray-400"}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between gap-2 items-center pt-2 border-t border-gray-50 dark:border-gray-800 mt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handlePowerUp(item)}
                  >
                    <ChevronUp size={16} /> Power
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleChangeStatus(item)}
                  >
                    <RefreshCw size={16} /> Change Status
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item)}
                  >
                    <Trash size={16} /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
