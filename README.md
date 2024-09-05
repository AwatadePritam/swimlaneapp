# Swimlane Drag-and-Drop Interface

This is a React-based drag-and-drop interface where users can move blocks between different lanes. The app includes functionality to add blocks, move blocks with defined rules, and view the movement history of each block.

## Features

- **Drag and Drop**: Move blocks between different lanes.
- **Add Blocks**: Dynamically add blocks to a selected lane.
- **Manage Rules**: Define rules that allow or deny the movement of blocks between specific lanes.
- **View History**: View the movement history of each block in a popover.
- **Responsive Design**: Supports both desktop and mobile drag-and-drop (using HTML5 Backend and Touch Backend for React DnD).

## Tech Stack

- **Frontend**: React, Chakra UI
- **State Management**: Redux Toolkit
- **Drag and Drop**: React DnD (HTML5 Backend for desktop, Touch Backend for mobile)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/swimlane-drag-drop.git
    ```
2. Navigate to the project directory:
    ```bash
    cd swimlane-drag-drop
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Run the app:
    ```bash
    npm start
    ```

## Usage

### Adding a Block
- Enter the block name in the input field.
- Select a lane from the dropdown.
- Click the "Add Block" button to add the block to the selected lane.

### Moving a Block
- Drag a block from one lane and drop it into another.
- If there are rules defined that deny the movement between certain lanes, the move will be blocked, and a notification will be shown.

### Defining Rules
- Select the source and target lanes in the "Manage Rules" section.
- Set the action (`allow` or `deny`) and click the "Add Rule" button.

### Viewing Block History
- Click on the information icon next to a block to view its movement history.

## Components

- **`DragDropContainer`**: Main component handling the lanes and blocks.
- **`DraggableDiv`**: Represents each block, allowing it to be dragged and dropped.
- **`Lane`**: Represents each lane, containing blocks.
- **`MoveBlockModal`**: Modal that appears when a block is being moved manually.
- **Redux Slice**: Manages the state of lanes, blocks, and movement rules.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

