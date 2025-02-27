package org.example.backend.services;

import org.example.backend.models.Task;
import org.example.backend.models.User;
import org.example.backend.repositories.TaskRepository;
import org.example.backend.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public List<Task> getAllTasks() {
        User currentUser = getCurrentUser();
        return taskRepository.findByUser(currentUser);
    }

    public Optional<Task> getTaskById(Long id) {
        User currentUser = getCurrentUser();
        return taskRepository.findById(id).filter(task -> task.getUser().equals(currentUser));
    }

    public Task createTask(Task task) {
        User currentUser = getCurrentUser();
        task.setUser(currentUser);
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        User currentUser = getCurrentUser();
        return taskRepository.findById(id).filter(task -> task.getUser().equals(currentUser)).map(task -> {
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setStatus(taskDetails.getStatus());
            task.setDueDate(taskDetails.getDueDate());
            return taskRepository.save(task);
        })
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Long id) {
        User currentUser = getCurrentUser();
        taskRepository.findById(id).filter(task -> task.getUser().equals(currentUser))
                .ifPresent(taskRepository::delete);
    }
}
