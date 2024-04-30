const tableContainer = document.getElementById('tableContainer');

// Fetch data from the API
fetch('https://careful-wasp-tunic.cyclic.app/getContact')
  .then(response => response.json())
  .then(data => {
    // Create the table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    // Add empty cell for actions
    headerRow.innerHTML += '<th> </th>';
    thead.appendChild(headerRow);

    // Create table rows with data
    data.forEach(rowData => {
      const tr = document.createElement('tr');
      headers.forEach(headerText => {
        const td = document.createElement('td');
        td.textContent = rowData[headerText];
        tr.appendChild(td);
      });
      // Add edit, update, and delete buttons to each row
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'edit-btn';
      editButton.addEventListener('click', () => toggleEditMode(tr));

      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.className = 'update-btn hide';
      updateButton.addEventListener('click', () => updateRow(tr));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-btn';
      deleteButton.addEventListener('click', () => deleteRow(tr));

      const actionCell = document.createElement('td');
      actionCell.appendChild(editButton);
      actionCell.appendChild(updateButton);
      actionCell.appendChild(deleteButton);
      tr.appendChild(actionCell);

      tbody.appendChild(tr);
    });

    // Append thead and tbody to the table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append table to the container
    tableContainer.appendChild(table);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to toggle edit mode
function toggleEditMode(row) {
  row.querySelectorAll('td:not(:last-child)').forEach(td => {
    const input = document.createElement('input');
    input.value = td.textContent;
    td.textContent = '';
    td.appendChild(input);
  });
  const editBtn = row.querySelector('.edit-btn');
  const updateBtn = row.querySelector('.update-btn');
  editBtn.classList.add('hide');
  updateBtn.classList.remove('hide');
}

// Function to update row data
function updateRow(row) {
  row.querySelectorAll('td:not(:last-child)').forEach(td => {
    const input = td.querySelector('input');
    td.textContent = input.value;
  });
  const editBtn = row.querySelector('.edit-btn');
  const updateBtn = row.querySelector('.update-btn');
  editBtn.classList.remove('hide');
  updateBtn.classList.add('hide');
}

// Function to delete row
function deleteRow(row) {
  row.parentNode.removeChild(row);
}
