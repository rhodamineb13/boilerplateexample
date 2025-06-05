package backOfficeService

import (
	"context"
	backOfficeDTO "godocker/internal/backoffice/models/dto"
	backOfficeRepository "godocker/internal/backoffice/repository"
)

type TaskService interface {
	AssignTask(ctx context.Context, employeeID string, taskID string) error
	ListTaskByEmployee(ctx context.Context, employeeID string, page, pageSize uint) (*backOfficeDTO.TaskEmployeeDTO, error)
	SetDone(ctx context.Context, taskID string) error
}

type taskService struct {
	repository backOfficeRepository.TaskRepository
}

func NewTaskService(repository backOfficeRepository.TaskRepository) TaskService {
	return &taskService{
		repository: repository,
	}
}
func (ts *taskService) AssignTask(ctx context.Context, employeeID string, taskID string) error {
	return ts.repository.AssignTask(ctx, employeeID, taskID)
}
func (ts *taskService) ListTaskByEmployee(ctx context.Context, employeeID string, page, pageSize uint) (*backOfficeDTO.TaskEmployeeDTO, error) {
	tasks, err := ts.repository.ListTaskByEmployee(ctx, employeeID, page, pageSize)
	if err != nil {
		return nil, err
	}

	taskDTO := &backOfficeDTO.TaskEmployeeDTO{
		EmployeeId: employeeID,
		Tasks:      make([]*backOfficeDTO.TaskDTO, 0, len(tasks)),
	}

	taskDTOs := make([]*backOfficeDTO.TaskDTO, 0)
	for _, task := range tasks {
		taskDTOs = append(taskDTOs, &backOfficeDTO.TaskDTO{
			TaskId:        task.Id,
			Description:   task.Description,
			Client: backOfficeDTO.TaskClientDTO{
				ClientId:            task.Client.Id,
				ClientName:          task.Client.Name,
				ClientAddress:       task.Client.Address,
			},
			IsDone: task.IsDone,
		})
	}

	taskDTO.Tasks = taskDTOs

	return taskDTO, nil
}

func (ts *taskService) SetDone(ctx context.Context, taskID string) error {
	return ts.repository.SetDone(ctx, taskID)
}
