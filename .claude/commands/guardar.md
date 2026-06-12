Run this bash command and report the result to the user in Portuguese:

```bash
cd ~/dev/Site_PortugalNTN/ntn-walking && git push 2>&1
```

If the output contains "Everything up-to-date" or similar, tell the user: "Já está atualizado, nenhuma novidade para guardar."
If the push succeeded with new commits, tell the user: "Guardado no GitHub com sucesso."
If there was an error, show the error message to the user.
